import { IsString, IsOptional, IsDate, IsObject, ValidateNested, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class AuthoritiesDto {
  @IsBoolean()
  @IsOptional()
  aio: boolean = false;

  @IsBoolean()
  @IsOptional()
  ncas: boolean = false;

  @IsBoolean()
  @IsOptional()
  dps: boolean = false;
}

export class ValueDto {
  @IsString()
  @IsOptional()
  value: string = '';

  @ValidateNested()
  @Type(() => AuthoritiesDto)
  authorities: AuthoritiesDto = new AuthoritiesDto();
}

export class ModalityDto {
  @IsOptional()
  @IsBoolean()
  enabled?: boolean = false;

  @IsOptional()
  @IsString()
  parameter?: string = '';
}

export class ModalitiesDto {
  @ValidateNested()
  @Type(() => ModalityDto)
  @IsOptional()
  text?: ModalityDto = new ModalityDto();

  @ValidateNested()
  @Type(() => ModalityDto)
  @IsOptional()
  images?: ModalityDto = new ModalityDto();

  @ValidateNested()
  @Type(() => ModalityDto)
  @IsOptional()
  audio?: ModalityDto = new ModalityDto();

  @ValidateNested()
  @Type(() => ModalityDto)
  @IsOptional()
  video?: ModalityDto = new ModalityDto();
}

export class CustomMetricDto {
  @IsString()
  @IsOptional()
  name?: string = '';

  @IsString()
  @IsOptional()
  parameter?: string = '';
}

export class ModalityValueDto {
  @ValidateNested()
  @Type(() => ModalitiesDto)
  modalities: ModalitiesDto = new ModalitiesDto();

  @ValidateNested()
  @Type(() => CustomMetricDto)
  customMetrics: CustomMetricDto[] = [];
}

export class ModalityWrapperDto {
  @ValidateNested()
  @Type(() => ModalityValueDto)
  value: ModalityValueDto = new ModalityValueDto();

  @ValidateNested()
  @Type(() => AuthoritiesDto)
  authorities: AuthoritiesDto = new AuthoritiesDto();
}

export class DocumentInfoDto {
  @Transform(({ value }) => (value ? new Date(value) : new Date()))
  lastUpdated: Date = new Date();

  @IsString()
  @IsOptional()
  documentVersion: string = '';
}

export class GeneralInformationDto {
  @ValidateNested()
  @Type(() => ValueDto)
  legalName: ValueDto = new ValueDto();

  @ValidateNested()
  @Type(() => ValueDto)
  modelFamily: ValueDto = new ValueDto();

  @ValidateNested()
  @Type(() => ValueDto)
  versionedModel: ValueDto = new ValueDto();

  @ValidateNested()
  @Type(() => ValueDto)
  modelAuthenticity: ValueDto = new ValueDto();

  @ValidateNested()
  @Type(() => ValueDto)
  releaseDate: ValueDto = new ValueDto();

  @ValidateNested()
  @Type(() => ValueDto)
  unionMarketRelease: ValueDto = new ValueDto();

  @ValidateNested()
  @Type(() => ValueDto)
  modelDependencies: ValueDto = new ValueDto();
}

export class ModelPropertiesDto {
  @ValidateNested()
  @Type(() => ValueDto)
  modelArchitecture: ValueDto = new ValueDto();

  @ValidateNested()
  @Type(() => ValueDto)
  designSpecification: ValueDto = new ValueDto();

  @ValidateNested()
  @Type(() => ModalityWrapperDto)
  inputModalities: ModalityWrapperDto = new ModalityWrapperDto();

  @ValidateNested()
  @Type(() => ModalityWrapperDto)
  outputModalities: ModalityWrapperDto = new ModalityWrapperDto();

  @ValidateNested()
  @Type(() => ValueDto)
  totalModelSize: ValueDto = new ValueDto();

  @ValidateNested()
  @Type(() => ValueDto)
  modelSizeRange: ValueDto = new ValueDto();
}

export class ModelDocumentationDto {
  @ValidateNested()
  @Type(() => DocumentInfoDto)
  documentInfo: DocumentInfoDto = new DocumentInfoDto();

  @ValidateNested()
  @Type(() => GeneralInformationDto)
  generalInformation: GeneralInformationDto = new GeneralInformationDto();

  @ValidateNested()
  @Type(() => ModelPropertiesDto)
  modelProperties: ModelPropertiesDto = new ModelPropertiesDto();
}
