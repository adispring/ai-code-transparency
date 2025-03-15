const fs = require('fs');
const path = require('path');
const pdf2docx = require('pdf2docx');

async function convertPDFToWord(pdfPath, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const pdfFileName = path.basename(pdfPath, path.extname(pdfPath));
  const wordFilePath = path.join(outputDir, `${pdfFileName}.docx`);

  try {
    await pdf2docx.convert(pdfPath, wordFilePath);
  } catch (error) {
    throw new Error(`Failed to convert PDF to Word: ${error.message}`);
  }
}

module.exports = { convertPDFToWord };
