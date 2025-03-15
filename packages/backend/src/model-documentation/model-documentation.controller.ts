import { Controller, Post, Body, Req } from '@nestjs/common';
import {
  GeneralInformationDto,
  ModelDocumentationDto,
  ModelPropertiesDto,
} from './model-documentation.dto';
import { Request } from 'express';

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
      // 打印原始请求数据
      // console.log('Raw request body:', JSON.stringify(req.body, null, 2));
      // console.log('\n=== After Validation and Transform ===\n');
      // console.log('Processed form data:', JSON.stringify(formData, null, 2));

      const aioData = {
        documentInfo: formData.documentInfo,
        generalInformation: filterDataByAuthority(formData.generalInformation, 'aio'),
        modelProperties: filterDataByAuthority(formData.modelProperties, 'aio'),
      };
      const ncasData = {
        documentInfo: formData.documentInfo,
        generalInformation: filterDataByAuthority(formData.generalInformation, 'ncas'),
        modelProperties: filterDataByAuthority(formData.modelProperties, 'ncas'),
      };
      const dpsData = {
        documentInfo: formData.documentInfo,
        generalInformation: filterDataByAuthority(formData.generalInformation, 'dps'),
        modelProperties: filterDataByAuthority(formData.modelProperties, 'dps'),
      };

      // TODO: 添加数据持久化逻辑

      console.log('aioData:', JSON.stringify(aioData, null, 2));
      console.log('ncasData:', JSON.stringify(ncasData, null, 2));
      console.log('dpsData:', JSON.stringify(dpsData, null, 2));

      return {
        success: true,
        message: 'Form data received and validated successfully',
        data: {
          originalData: formData,
          aioData,
          ncasData,
          dpsData,
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
