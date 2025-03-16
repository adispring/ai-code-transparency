import { Controller, Post, Body, Req, Get } from '@nestjs/common';
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
import { saveFormData, getFormData } from '../utils/storage.util';

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

@Controller()
export class ModelDocumentationController {
  @Post('api/model-documentation/:path')
  async submitForm(@Req() req: Request, @Body() formData: ModelDocumentationDto) {
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

      // Save form data to database
      await saveFormData({
        formData,
        processedData: {
          aioData,
          ncasData,
          dpsData,
        },
        generatedFiles: {
          aioFilePath,
          ncasFilePath,
          dpsFilePath,
        },
      });

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

  @Get('api/external/get-form-data')
  async getFormData() {
    try {
      const data = await getFormData();
      return {
        success: true,
        data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Error syncing form data',
        error: error?.message || 'Unknown error',
      };
    }
  }

  @Post('api/company/sync-form-data')
  async syncFormData(@Req() req: Request, @Body() formData: ModelDocumentationDto) {
    try {
      // printFieldDescriptions(ModelDocumentationDto);

      // Save form data to database
      await saveFormData({
        formData,
      });

      return {
        success: true,
        message: 'Form data received and validated successfully',
        data: {
          originalData: formData,
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
