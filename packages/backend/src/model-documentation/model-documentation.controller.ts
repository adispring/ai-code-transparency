import { Controller, Post, Body, Req } from '@nestjs/common';
import { ModelDocumentationDto } from './model-documentation.dto';
import { Request } from 'express';

@Controller('api/model-documentation')
export class ModelDocumentationController {
  @Post()
  async submitForm(@Req() req: Request, @Body() formData: ModelDocumentationDto) {
    try {
      // 打印原始请求数据
      console.log('Raw request body:', JSON.stringify(req.body, null, 2));
      console.log('\n=== After Validation and Transform ===\n');
      console.log('Processed form data:', JSON.stringify(formData, null, 2));

      // TODO: 添加数据持久化逻辑

      return {
        success: true,
        message: 'Form data received and validated successfully',
        data: formData,
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
