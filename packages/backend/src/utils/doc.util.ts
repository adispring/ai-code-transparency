import { Document, Packer, Paragraph, TextRun } from 'docx';
import * as fs from 'fs';
import * as path from 'path';

interface FilteredData {
  [key: string]: {
    [key: string]: {
      value: string;
      description: string;
    };
  };
}

const FirstLevelKeyMap = {
  documentInfo: '',
  generalInformation: 'General Information',
  modelProperties: 'Model Properties',
};

function generateParagraphs(data: FilteredData): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  paragraphs.push(
    new Paragraph({
      text: 'Model Documentation Form',
      heading: 'Title',
      alignment: 'center',
      spacing: {
        after: 600, // Large spacing after title
      },
    })
  );

  Object.entries(data).forEach(
    ([section, content]: [string, FilteredData[keyof FilteredData]], sectionIndex) => {
      // Add extra spacing before section (except first section)
      if (sectionIndex > 0) {
        paragraphs.push(
          new Paragraph({
            spacing: {
              before: 400, // Large spacing between sections
            },
          })
        );
      }

      // Add section heading (centered)
      paragraphs.push(
        new Paragraph({
          text: FirstLevelKeyMap[section as keyof typeof FirstLevelKeyMap],
          heading: 'Heading1',
          alignment: 'center',
          spacing: {
            after: 300, // Medium spacing after heading
          },
        })
      );

      if (section === 'documentInfo') {
        // 在同一行放置两个字段, 一个是日期, 一个是版本号，一个在左边，一个在右边, 用于显示文档的最后更新日期和版本号,两个间隔一定的距离
        const lastUpdated = content.lastUpdated;
        const documentVersion = content.documentVersion;
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${lastUpdated.description}: ${lastUpdated.value}`, bold: true }),
              new TextRun({ text: ' '.repeat(10) }),
              new TextRun({
                text: `${documentVersion.description}: ${documentVersion.value}`,
                bold: true,
              }),
            ],
          })
        );
      } else {
        // Add bullet points for each item
        Object.values(content).forEach(item => {
          paragraphs.push(
            new Paragraph({
              children: [new TextRun(`${item.description}: ${item.value}`)],
              bullet: {
                level: 0,
              },
              spacing: {
                before: 100, // Small spacing between list items
                after: 100,
              },
            })
          );
        });
      }

      // Add spacing after each section
      paragraphs.push(new Paragraph({}));
    }
  );

  return paragraphs;
}

export async function generateDocFile(data: FilteredData, filename: string): Promise<string> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: generateParagraphs(data),
      },
    ],
  });

  const outputDir = path.join(__dirname, '../../../docs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filepath = path.join(outputDir, `${filename}.docx`);
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filepath, buffer);
  return filepath;
}
