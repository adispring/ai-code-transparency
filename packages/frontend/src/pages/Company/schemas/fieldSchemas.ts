export const createFieldSchema = (fieldConfig: any, fieldPath: string) => {
  const { title, description, required, component, componentProps, ...rest } = fieldConfig;

  return {
    type: 'object',
    'x-component': 'FieldWithCheckboxes',
    properties: {
      value: {
        ...rest,
        type: 'string',
        title,
        description,
        required,
        'x-component': component || 'Input',
        'x-component-props': {
          ...(componentProps || {}),
          ...(component === 'Radio.Group'
            ? {
                optionType: 'button',
                options: componentProps?.enum?.map((item: any) => ({
                  label: item.label,
                  value: item.value,
                })),
              }
            : {}),
        },
        'x-decorator': 'FormItem',
      },
      authorities: {
        type: 'object',
        'x-component': 'div',
        properties: {
          aio: { type: 'boolean', default: false },
          ncas: { type: 'boolean', default: false },
          dps: { type: 'boolean', default: false },
        },
      },
    },
  };
};

export const createModalityFieldSchema = (fieldConfig: any, fieldPath: string) => {
  const { title, description } = fieldConfig;

  return {
    type: 'object',
    'x-component': 'FieldWithCheckboxes',
    'x-decorator-props': {
      basePath: fieldPath,
    },
    properties: {
      value: {
        type: 'object',
        title,
        description,
        'x-decorator': 'FormItem',
        properties: {
          modalities: {
            type: 'object',
            properties: {
              text: createModalityProperty('Text'),
              images: createModalityProperty('Images'),
              audio: createModalityProperty('Audio'),
              video: createModalityProperty('Video'),
            },
          },
          customMetrics: {
            type: 'array',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems',
            items: createCustomMetricItem(),
            properties: {
              add: {
                type: 'void',
                title: 'If any other please specify:',
                'x-component': 'ArrayItems.Addition',
              },
            },
          },
        },
      },
      authorities: {
        type: 'object',
        properties: {
          aio: { type: 'boolean', default: false },
          ncas: { type: 'boolean', default: false },
          dps: { type: 'boolean', default: false },
        },
      },
    },
  };
};

const createModalityProperty = (label: string) => ({
  type: 'object',
  'x-component': 'FormItem',
  'x-component-props': {
    style: { display: 'flex', alignItems: 'center', gap: '16px' },
  },
  properties: {
    enabled: {
      type: 'boolean',
      'x-component': 'Checkbox',
      'x-content': label,
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        feedbackLayout: 'none',
      },
    },
    parameter: {
      type: 'string',
      title: 'Parameter',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: 'Maximum size',
      },
      'x-reactions': {
        dependencies: ['enabled'],
        fulfill: {
          state: {
            visible: '{{$deps[0]}}',
          },
        },
      },
    },
  },
});

const createCustomMetricItem = () => ({
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Metric name',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: 'Enter metric name',
      },
    },
    parameter: {
      type: 'string',
      title: 'Parameter',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: 'Maximum size:',
      },
    },
    remove: {
      type: 'void',
      'x-component': 'ArrayItems.Remove',
    },
  },
});
