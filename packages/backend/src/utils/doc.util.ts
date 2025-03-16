import { Document, Packer, Paragraph, TextRun } from 'docx';
import * as fs from 'fs';
import * as path from 'path';
import { getDescription } from '../decorators/description.decorator';

export async function generateDocFile(data: any, filename: string): Promise<string> {
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

function generateParagraphs(obj: any, prefix = ''): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;

    const description = getDescription(obj, key) || key;
    const formattedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && !Array.isArray(value)) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: `${formattedKey}:`, bold: true })],
        })
      );
      paragraphs.push(...generateParagraphs(value, formattedKey));
    } else {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${description}: `, bold: true }),
            new TextRun({ text: String(value) }),
          ],
        })
      );
    }
  }

  return paragraphs;
}
