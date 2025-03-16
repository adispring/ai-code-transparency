import { Controller, Post, Body, Req } from '@nestjs/common';
import {
  DocumentInfoDto,
  GeneralInformationDto,
  ModelDocumentationDto,
  ModelPropertiesDto,
} from './model-documentation.dto';
import { Request } from 'express';
import { printFieldDescriptions } from 'src/utils/metadata.util';
import { getDescription } from 'src/decorators/description.decorator';
import { generateDocFile } from '../utils/doc.util';

const transformDocumentInfo = (documentInfo: DocumentInfoDto) => {
  return Object.fromEntries(
    Object.entries(documentInfo).map(([key, value]) => [
      key,
      { description: getDescription(documentInfo, key) ?? '', value },
    ])
  );
};

const filterDataByAuthority = (
  data: GeneralInformationDto | ModelPropertiesDto,
  authority: 'aio' | 'ncas' | 'dps'
) => {
  const filteredEntries = Object.fromEntries(
    Object.entries(data)
      .map(([key, value]) => [key, { description: getDescription(data, key), ...value }])
      .filter(([key, value]) => {
        return value.authorities?.[authority];
      })
  );

  return filteredEntries;
};

@Controller('api/model-documentation')
export class ModelDocumentationController {
  @Post()
  async submitForm(@Req() req: Request, @Body() formData: ModelDocumentationDto) {
    // console.log('req.body:', req.body);
    // console.log('Form Data:', formData);
    try {
      // printFieldDescriptions(ModelDocumentationDto);

      // 创建新的 ModelDocumentationDto 实例
      const aioData = {
        documentInfo: transformDocumentInfo(formData.documentInfo),
        generalInformation: filterDataByAuthority(formData.generalInformation, 'aio'),
        modelProperties: filterDataByAuthority(formData.modelProperties, 'aio'),
      };

      const ncasData = {
        documentInfo: transformDocumentInfo(formData.documentInfo),
        generalInformation: filterDataByAuthority(formData.generalInformation, 'ncas'),
        modelProperties: filterDataByAuthority(formData.modelProperties, 'ncas'),
      };

      const dpsData = {
        documentInfo: transformDocumentInfo(formData.documentInfo),
        generalInformation: filterDataByAuthority(formData.generalInformation, 'dps'),
        modelProperties: filterDataByAuthority(formData.modelProperties, 'dps'),
      };

      const aioFilePath = await generateDocFile(aioData, `aio`);
      const ncasFilePath = await generateDocFile(ncasData, `ncas`);
      const dpsFilePath = await generateDocFile(dpsData, `dps`);

      console.log('Generated File Paths:', { aioFilePath, ncasFilePath, dpsFilePath });

      console.log('AIO Data:', aioData);
      console.log('NCAS Data:', ncasData);
      console.log('DPS Data:', dpsData);

      return {
        success: true,
        message: 'Form data received and validated successfully',
        data: {
          originalData: formData,
          aioData,
          ncasData,
          dpsData,
          generatedFiles: {
            aioFilePath,
            ncasFilePath,
            dpsFilePath,
          },
        },
      };
    } catch (error: any) {
      console.error('Error processing form data:', error);
      return {
        success: false,
        message: 'Error processing form data',
        error: error?.message || 'Unknown error',
      };
    }
  }
}
