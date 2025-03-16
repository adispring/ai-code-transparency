import { Controller, Post, Body, Req } from '@nestjs/common';
import {
  GeneralInformationDto,
  ModelDocumentationDto,
  ModelPropertiesDto,
} from './model-documentation.dto';
import { Request } from 'express';
import { printFieldDescriptions } from 'src/utils/metadata.util';
import { getDescription } from 'src/decorators/description.decorator';
import { generateDocFile } from '../utils/doc.util';

const filterDataByAuthority = (
  data: GeneralInformationDto | ModelPropertiesDto,
  authority: 'aio' | 'ncas' | 'dps'
) => {
  return Object.fromEntries(
    Object.entries(data).filter(([key, value]) => {
      return value.authorities?.[authority];
    })
  );
};

@Controller('api/model-documentation')
export class ModelDocumentationController {
  @Post()
  async submitForm(@Req() req: Request, @Body() formData: ModelDocumentationDto) {
    try {
      printFieldDescriptions(ModelDocumentationDto);
      const documentInfoDescription = getDescription(formData, 'documentInfo');
      console.log('Document Info Description:', documentInfoDescription);

      // 创建新的 ModelDocumentationDto 实例
      const aioData = new ModelDocumentationDto();
      aioData.documentInfo = formData.documentInfo;
      aioData.generalInformation = filterDataByAuthority(
        formData.generalInformation,
        'aio'
      ) as GeneralInformationDto;
      aioData.modelProperties = filterDataByAuthority(
        formData.modelProperties,
        'aio'
      ) as ModelPropertiesDto;

      const ncasData = new ModelDocumentationDto();
      ncasData.documentInfo = formData.documentInfo;
      ncasData.generalInformation = filterDataByAuthority(
        formData.generalInformation,
        'ncas'
      ) as GeneralInformationDto;
      ncasData.modelProperties = filterDataByAuthority(
        formData.modelProperties,
        'ncas'
      ) as ModelPropertiesDto;

      const dpsData = new ModelDocumentationDto();
      dpsData.documentInfo = formData.documentInfo;
      dpsData.generalInformation = filterDataByAuthority(
        formData.generalInformation,
        'dps'
      ) as GeneralInformationDto;
      dpsData.modelProperties = filterDataByAuthority(
        formData.modelProperties,
        'dps'
      ) as ModelPropertiesDto;

      const aioDataDescription = getDescription(aioData, 'documentInfo');
      console.log('AIO Data Description:', aioDataDescription);

      // TODO: 添加数据持久化逻辑

      console.log('aioData:', JSON.stringify(aioData, null, 2));
      console.log('ncasData:', JSON.stringify(ncasData, null, 2));
      console.log('dpsData:', JSON.stringify(dpsData, null, 2));

      const timestamp = Math.floor(Date.now() / 1000);
      const aioFilePath = await generateDocFile(aioData, `aioData-${timestamp}`);
      const ncasFilePath = await generateDocFile(ncasData, `ncasData-${timestamp}`);
      const dpsFilePath = await generateDocFile(dpsData, `dpsData-${timestamp}`);

      console.log('Generated File Paths:', { aioFilePath, ncasFilePath, dpsFilePath });

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
