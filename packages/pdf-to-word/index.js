#!/usr/bin/env node

const { Command } = require('commander');
const { convertPDFToWord } = require('./pdfToWord');
const path = require('path');

const program = new Command();

program
  .version('1.0.0')
  .description('Convert PDF files to Word documents')
  .argument('<pdfPath>', 'Path to the PDF file to be converted')
  .action(async pdfPath => {
    try {
      const outputDir = path.resolve(__dirname, 'word');
      await convertPDFToWord(pdfPath, outputDir);
      console.log(`PDF converted to Word and saved in ${outputDir}`);
    } catch (error) {
      console.error('Error converting PDF to Word:', error);
    }
  });

program.parse(process.argv);
