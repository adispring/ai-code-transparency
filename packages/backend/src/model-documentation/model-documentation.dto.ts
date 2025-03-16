import { IsString, IsOptional, IsDate, IsObject, ValidateNested, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { Description } from '../decorators/description.decorator';

export class AuthoritiesDto {
  @Description('Indicates if AIO is enabled')
  @IsBoolean()
  @IsOptional()
  aio: boolean = false;

  @Description('Indicates if NCAS is enabled')
  @IsBoolean()
  @IsOptional()
  ncas: boolean = false;

  @Description('Indicates if DPS is enabled')
  @IsBoolean()
  @IsOptional()
  dps: boolean = false;
}

export class ValueDto {
  @Description('The value as a string')
  @IsString()
  @IsOptional()
  value: string = '';

  @Description('Authorities associated with the value')
  @ValidateNested()
  @Type(() => AuthoritiesDto)
  authorities: AuthoritiesDto = new AuthoritiesDto();
}

export class ModalityDto {
  @Description('Indicates if the modality is enabled')
  @IsOptional()
  @IsBoolean()
  enabled?: boolean = false;

  @Description('The parameter for the modality')
  @IsOptional()
  @IsString()
  parameter?: string = '';
}

export class ModalitiesDto {
  @Description('Text modality details')
  @ValidateNested()
  @Type(() => ModalityDto)
  @IsOptional()
  text?: ModalityDto = new ModalityDto();

  @Description('Image modality details')
  @ValidateNested()
  @Type(() => ModalityDto)
  @IsOptional()
  images?: ModalityDto = new ModalityDto();

  @Description('Audio modality details')
  @ValidateNested()
  @Type(() => ModalityDto)
  @IsOptional()
  audio?: ModalityDto = new ModalityDto();

  @Description('Video modality details')
  @ValidateNested()
  @Type(() => ModalityDto)
  @IsOptional()
  video?: ModalityDto = new ModalityDto();
}

export class CustomMetricDto {
  @Description('Name of the custom metric')
  @IsString()
  @IsOptional()
  name?: string = '';

  @Description('Parameter for the custom metric')
  @IsString()
  @IsOptional()
  parameter?: string = '';
}

export class ModalityValueDto {
  @Description('Modalities associated with the value')
  @ValidateNested()
  @Type(() => ModalitiesDto)
  modalities: ModalitiesDto = new ModalitiesDto();

  @Description('Custom metrics associated with the value')
  @ValidateNested()
  @Type(() => CustomMetricDto)
  customMetrics: CustomMetricDto[] = [];
}

export class ModalityWrapperDto {
  @Description('Value details for the modality')
  @ValidateNested()
  @Type(() => ModalityValueDto)
  value: ModalityValueDto = new ModalityValueDto();

  @Description('Authorities associated with the modality')
  @ValidateNested()
  @Type(() => AuthoritiesDto)
  authorities: AuthoritiesDto = new AuthoritiesDto();
}

export class DocumentInfoDto {
  @Description('Date the document was last updated')
  @IsString()
  @IsOptional()
  lastUpdated: string = '';

  @Description('Document version number')
  @IsString()
  @IsOptional()
  documentVersion: string = '';
}

export class GeneralInformationDto {
  @Description('Legal name for the model provider')
  @ValidateNested()
  @Type(() => ValueDto)
  legalName: ValueDto = new ValueDto();

  @Description('Model family:')
  @ValidateNested()
  @Type(() => ValueDto)
  modelFamily: ValueDto = new ValueDto();

  @Description('Versioned model name')
  @ValidateNested()
  @Type(() => ValueDto)
  versionedModel: ValueDto = new ValueDto();

  @Description('Model authenticity')
  @ValidateNested()
  @Type(() => ValueDto)
  modelAuthenticity: ValueDto = new ValueDto();

  @Description('Release date')
  @ValidateNested()
  @Type(() => ValueDto)
  releaseDate: ValueDto = new ValueDto();

  @Description('Union market release')
  @ValidateNested()
  @Type(() => ValueDto)
  unionMarketRelease: ValueDto = new ValueDto();

  @Description('Model dependencies')
  @ValidateNested()
  @Type(() => ValueDto)
  modelDependencies: ValueDto = new ValueDto();

  static fromPlainObject(plainObj: Partial<GeneralInformationDto>): GeneralInformationDto {
    const dto = new GeneralInformationDto();

    if (plainObj.legalName) {
      dto.legalName = { ...new ValueDto(), ...plainObj.legalName };
    }
    if (plainObj.modelFamily) {
      dto.modelFamily = { ...new ValueDto(), ...plainObj.modelFamily };
    }
    if (plainObj.versionedModel) {
      dto.versionedModel = { ...new ValueDto(), ...plainObj.versionedModel };
    }
    if (plainObj.modelAuthenticity) {
      dto.modelAuthenticity = { ...new ValueDto(), ...plainObj.modelAuthenticity };
    }
    if (plainObj.releaseDate) {
      dto.releaseDate = { ...new ValueDto(), ...plainObj.releaseDate };
    }
    if (plainObj.unionMarketRelease) {
      dto.unionMarketRelease = { ...new ValueDto(), ...plainObj.unionMarketRelease };
    }
    if (plainObj.modelDependencies) {
      dto.modelDependencies = { ...new ValueDto(), ...plainObj.modelDependencies };
    }

    return dto;
  }
}

export class ModelPropertiesDto {
  @Description('Model architecture')
  @ValidateNested()
  @Type(() => ValueDto)
  modelArchitecture: ValueDto = new ValueDto();

  @Description('Design specification of the model')
  @ValidateNested()
  @Type(() => ValueDto)
  designSpecification: ValueDto = new ValueDto();

  @Description('Input modalities')
  @ValidateNested()
  @Type(() => ModalityWrapperDto)
  inputModalities: ModalityWrapperDto = new ModalityWrapperDto();

  @Description('Output modalities')
  @ValidateNested()
  @Type(() => ModalityWrapperDto)
  outputModalities: ModalityWrapperDto = new ModalityWrapperDto();

  @Description('Total model size')
  @ValidateNested()
  @Type(() => ValueDto)
  totalModelSize: ValueDto = new ValueDto();

  @Description('Model size range')
  @ValidateNested()
  @Type(() => ValueDto)
  modelSizeRange: ValueDto = new ValueDto();

  static fromPlainObject(plainObj: Partial<ModelPropertiesDto>): ModelPropertiesDto {
    const dto = new ModelPropertiesDto();

    if (plainObj.modelArchitecture) {
      dto.modelArchitecture = { ...new ValueDto(), ...plainObj.modelArchitecture };
    }
    if (plainObj.designSpecification) {
      dto.designSpecification = { ...new ValueDto(), ...plainObj.designSpecification };
    }
    if (plainObj.inputModalities) {
      dto.inputModalities = {
        ...new ModalityWrapperDto(),
        ...plainObj.inputModalities,
        value: {
          ...new ModalityValueDto(),
          ...plainObj.inputModalities.value,
          modalities: {
            ...new ModalitiesDto(),
            ...plainObj.inputModalities.value?.modalities,
          },
        },
      };
    }
    if (plainObj.outputModalities) {
      dto.outputModalities = {
        ...new ModalityWrapperDto(),
        ...plainObj.outputModalities,
        value: {
          ...new ModalityValueDto(),
          ...plainObj.outputModalities.value,
          modalities: {
            ...new ModalitiesDto(),
            ...plainObj.outputModalities.value?.modalities,
          },
        },
      };
    }
    if (plainObj.totalModelSize) {
      dto.totalModelSize = { ...new ValueDto(), ...plainObj.totalModelSize };
    }
    if (plainObj.modelSizeRange) {
      dto.modelSizeRange = { ...new ValueDto(), ...plainObj.modelSizeRange };
    }

    return dto;
  }
}

export class ModelDocumentationDto {
  @Description('Document information')
  @ValidateNested()
  @Type(() => DocumentInfoDto)
  documentInfo: DocumentInfoDto = new DocumentInfoDto();

  @Description('General information')
  @ValidateNested()
  @Type(() => GeneralInformationDto)
  generalInformation: GeneralInformationDto = new GeneralInformationDto();

  @Description('Model properties')
  @ValidateNested()
  @Type(() => ModelPropertiesDto)
  modelProperties: ModelPropertiesDto = new ModelPropertiesDto();
}
