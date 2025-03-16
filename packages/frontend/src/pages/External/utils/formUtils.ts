export const processFormData = (data: any) => {
  const result: any = {
    documentInfo: {},
    generalInformation: {},
    modelProperties: {},
  };

  console.log('Processing form data:', data);

  // Keep original documentInfo structure
  if (data.documentInfo) {
    result.documentInfo = data.documentInfo;
  }

  const fieldMappings = {
    documentInfo: ['lastUpdated', 'documentVersion'],
    generalInformation: [
      'legalName',
      'modelFamily',
      'versionedModel',
      'modelAuthenticity',
      'releaseDate',
      'unionMarketRelease',
      'modelDependencies',
    ],
    modelProperties: [
      'modelArchitecture',
      'designSpecification',
      'inputModalities',
      'outputModalities',
      'totalModelSize',
      'modelSizeRange',
    ],
  };

  Object.entries(data).forEach(([key, value]: [string, any]) => {
    if (key === 'documentInfo') {
    }

    let section = null;
    if (fieldMappings.documentInfo.includes(key)) {
      section = 'documentInfo';
    } else if (fieldMappings.generalInformation.includes(key)) {
      section = 'generalInformation';
    } else if (fieldMappings.modelProperties.includes(key)) {
      section = 'modelProperties';
    }

    if (section && value && typeof value === 'object') {
      if (key.endsWith('Modalities') && section === 'modelProperties') {
        const modalityValue = value.value || {};
        const modalities = modalityValue.modalities || {
          text: { enabled: false, parameter: '' },
          images: { enabled: false, parameter: '' },
          audio: { enabled: false, parameter: '' },
          video: { enabled: false, parameter: '' },
        };

        ['text', 'images', 'audio', 'video'].forEach(modalityType => {
          if (!modalities[modalityType]) {
            modalities[modalityType] = { enabled: false, parameter: '' };
          } else if (typeof modalities[modalityType] !== 'object') {
            modalities[modalityType] = {
              enabled: Boolean(modalities[modalityType]),
              parameter: '',
            };
          }
        });

        result[section][key] = {
          value: {
            modalities,
            customMetrics: modalityValue.customMetrics || [],
          },
          authorities: value.authorities || { aio: false, ncas: false, dps: false },
        };
      } else {
        result[section][key] = {
          value: value.value || '',
          authorities: value.authorities || { aio: false, ncas: false, dps: false },
        };
      }

      const nestedAuthorities = value[section]?.[key]?.authorities;
      if (nestedAuthorities) {
        Object.assign(result[section][key].authorities, nestedAuthorities);
      }
    } else if (section) {
      result[section][key] = value;
    }
  });

  return result;
};
