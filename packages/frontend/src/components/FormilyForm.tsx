import React from 'react';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField, Field, useField } from '@formily/react';
import type { Field as FieldType } from '@formily/core';
import { theme, message } from 'antd';
import {
  Form,
  FormItem,
  Input,
  Select,
  DatePicker,
  Submit,
  Space,
  NumberPicker,
  Radio,
  Checkbox,
  ArrayItems,
} from '@formily/antd-v5';

// 创建一个自定义组件来显示带有复选框的字段
const FieldWithCheckboxes: React.FC<any> = props => {
  const { children, basePath } = props;
  const field = useField<FieldType>();

  // 初始化时设置默认值
  React.useEffect(() => {
    const defaultAuthorities = {
      aio: false,
      ncas: false,
      dps: false,
    };

    if (!field.value) {
      field.setValue({ value: '', authorities: defaultAuthorities });
    } else if (!field.value.authorities) {
      field.setValue({ ...field.value, authorities: defaultAuthorities });
    }
  }, [field]);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
      <div style={{ flex: 1 }}>{children}</div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '8px', minWidth: '200px' }}>
        <Field
          name={`${basePath}.authorities.aio`}
          component={[Checkbox]}
          decorator={[FormItem]}
          initialValue={false}
          reactions={field => {
            field.setComponentProps({
              onChange: (checked: boolean) => {
                field.setValue(checked);
              },
            });
          }}
        >
          AIO
        </Field>
        <Field
          name={`${basePath}.authorities.ncas`}
          component={[Checkbox]}
          decorator={[FormItem]}
          initialValue={false}
          reactions={field => {
            field.setComponentProps({
              onChange: (checked: boolean) => {
                field.setValue(checked);
              },
            });
          }}
        >
          NCAs
        </Field>
        <Field
          name={`${basePath}.authorities.dps`}
          component={[Checkbox]}
          decorator={[FormItem]}
          initialValue={false}
          reactions={field => {
            field.setComponentProps({
              onChange: (checked: boolean) => {
                field.setValue(checked);
              },
            });
          }}
        >
          DPs
        </Field>
      </div>
    </div>
  );
};

// 创建表格容器组件
const TableContainer: React.FC<any> = ({ title, children }) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ marginBottom: '16px' }}>{title}</h2>
      <div
        style={{
          border: '1px solid #f0f0f0',
          borderRadius: '8px',
          padding: '24px',
          backgroundColor: '#fff',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>{children}</div>
      </div>
    </div>
  );
};

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
    DatePicker,
    NumberPicker,
    Radio,
    Checkbox,
    ArrayItems,
    FieldWithCheckboxes,
    TableContainer,
  },
});

const form = createForm();

const createFieldSchema = (fieldConfig: any, fieldPath: string) => {
  const { title, description, required, component, componentProps, ...rest } = fieldConfig;

  return {
    type: 'object',
    'x-component': 'FieldWithCheckboxes',
    'x-decorator-props': {
      basePath: fieldPath,
    },
    properties: {
      value: {
        ...rest,
        type: 'string',
        title,
        description,
        required,
        'x-component': component || 'Input',
        'x-component-props': componentProps || {},
        'x-decorator': 'FormItem',
      },
      authorities: {
        type: 'object',
        properties: {
          aio: {
            type: 'boolean',
            default: false,
          },
          ncas: {
            type: 'boolean',
            default: false,
          },
          dps: {
            type: 'boolean',
            default: false,
          },
        },
      },
    },
  };
};

const createModalityFieldSchema = (fieldConfig: any, fieldPath: string) => {
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
              text: {
                type: 'object',
                'x-component': 'FormItem',
                'x-component-props': {
                  style: { display: 'flex', alignItems: 'center', gap: '16px' },
                },
                properties: {
                  enabled: {
                    type: 'boolean',
                    'x-component': 'Checkbox',
                    'x-content': 'Text',
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
                      placeholder: 'e.g., Maximum number of tokens',
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
              },
              images: {
                type: 'object',
                'x-component': 'FormItem',
                'x-component-props': {
                  style: { display: 'flex', alignItems: 'center', gap: '16px' },
                },
                properties: {
                  enabled: {
                    type: 'boolean',
                    'x-component': 'Checkbox',
                    'x-content': 'Images',
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
                      placeholder: 'e.g., Maximum image resolution',
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
              },
              audio: {
                type: 'object',
                'x-component': 'FormItem',
                'x-component-props': {
                  style: { display: 'flex', alignItems: 'center', gap: '16px' },
                },
                properties: {
                  enabled: {
                    type: 'boolean',
                    'x-component': 'Checkbox',
                    'x-content': 'Audio',
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
                      placeholder: 'e.g., Maximum audio duration',
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
              },
              video: {
                type: 'object',
                'x-component': 'FormItem',
                'x-component-props': {
                  style: { display: 'flex', alignItems: 'center', gap: '16px' },
                },
                properties: {
                  enabled: {
                    type: 'boolean',
                    'x-component': 'Checkbox',
                    'x-content': 'Video',
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
                      placeholder: 'e.g., Maximum video length',
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
              },
            },
          },
          customMetrics: {
            type: 'array',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems',
            items: {
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
                    placeholder: 'Enter parameter value',
                  },
                },
                remove: {
                  type: 'void',
                  'x-component': 'ArrayItems.Remove',
                },
              },
            },
            properties: {
              add: {
                type: 'void',
                title: 'Add custom metric',
                'x-component': 'ArrayItems.Addition',
              },
            },
          },
        },
      },
      authorities: {
        type: 'object',
        properties: {
          aio: {
            type: 'boolean',
            default: false,
          },
          ncas: {
            type: 'boolean',
            default: false,
          },
          dps: {
            type: 'boolean',
            default: false,
          },
        },
      },
    },
  };
};

const schema = {
  type: 'object',
  properties: {
    documentInfo: {
      type: 'void',
      'x-component': 'FormItem',
      'x-component-props': {
        style: { marginBottom: '24px' },
      },
      properties: {
        lastUpdated: {
          type: 'string',
          title: 'Date the document was last updated',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
        },
        documentVersion: {
          type: 'string',
          title: 'Document version number',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: 'e.g., 1.0.0',
          },
        },
      },
    },
    generalInformation: {
      type: 'void',
      'x-component': 'TableContainer',
      'x-component-props': {
        title: 'General Information',
      },
      properties: {
        legalName: createFieldSchema(
          {
            title: 'Legal name for the model provider',
            required: true,
            component: 'Input',
            componentProps: {
              placeholder: 'e.g., OpenAI Corporation',
            },
          },
          'generalInformation.legalName'
        ),
        modelFamily: createFieldSchema(
          {
            title: 'Model family',
            description: 'The identifier, if any, for the collection of models (e.g. Llama)',
            required: true,
            component: 'Input',
            componentProps: {
              placeholder: 'e.g., GPT, Llama, PaLM',
            },
          },
          'generalInformation.modelFamily'
        ),
        versionedModel: createFieldSchema(
          {
            title: 'Versioned model',
            description: 'The unique identifier for the model (e.g. Llama 3.1-40B)',
            required: true,
            component: 'Input',
            componentProps: {
              placeholder: 'e.g., GPT-4-32k, Llama-2-70B',
            },
          },
          'generalInformation.versionedModel'
        ),
        modelAuthenticity: createFieldSchema(
          {
            title: 'Model authenticity',
            description:
              'Evidence that establishes the provenance and authenticity of the model (e.g. a secure hash if binaries are distributed, the URL endpoint in the case of a service), where available',
            component: 'Input.TextArea',
            componentProps: {
              placeholder: 'e.g., SHA-256: 7d5e..., or API endpoint: https://api.example.com/v1',
            },
          },
          'generalInformation.modelAuthenticity'
        ),
        releaseDate: createFieldSchema(
          {
            title: 'Release date',
            description:
              'Date when the model was first distributed through any distribution channel',
            component: 'DatePicker',
          },
          'generalInformation.releaseDate'
        ),
        unionMarketRelease: createFieldSchema(
          {
            title: 'Union market release',
            description: 'Date when the model was placed on the Union market',
            component: 'DatePicker',
          },
          'generalInformation.unionMarketRelease'
        ),
        modelDependencies: createFieldSchema(
          {
            title: 'Model dependencies',
            description:
              'The list of other general-purpose AI models that the model builds upon, if any',
            component: 'Input.TextArea',
            componentProps: {
              placeholder: 'e.g., Base model: Llama-2, Fine-tuned with: RLHF',
            },
          },
          'generalInformation.modelDependencies'
        ),
      },
    },
    modelProperties: {
      type: 'void',
      'x-component': 'TableContainer',
      'x-component-props': {
        title: 'Model Properties',
      },
      properties: {
        modelArchitecture: createFieldSchema(
          {
            title: 'Model architecture',
            description:
              'A general description of the model architecture, e.g. a transformer architecture. (Recommended 20 words)',
            required: true,
            component: 'Input.TextArea',
            componentProps: {
              placeholder:
                'e.g., Decoder-only transformer architecture with multi-head attention and feed-forward networks',
            },
          },
          'modelProperties.modelArchitecture'
        ),
        designSpecification: createFieldSchema(
          {
            title: 'Design specification of the model',
            description:
              'A general description of the key design choices of the model, including rationale and assumptions made, to provide better understanding of the model. (Recommended 100 words)',
            component: 'Input.TextArea',
            componentProps: {
              placeholder:
                'e.g., The model uses a scaled-up transformer architecture with improvements in attention mechanism...',
            },
          },
          'modelProperties.designSpecification'
        ),
        inputModalities: createModalityFieldSchema(
          {
            title: 'Input modalities',
            description: 'The supported input modalities for this model',
          },
          'modelProperties.inputModalities'
        ),
        outputModalities: createModalityFieldSchema(
          {
            title: 'Output modalities',
            description: 'The supported output modalities for this model',
          },
          'modelProperties.outputModalities'
        ),
        totalModelSize: createFieldSchema(
          {
            title: 'Total model size',
            description:
              'The total number of parameters of the model, recorded with at least two significant figures, e.g 7.5*10^10',
            component: 'Input',
            componentProps: {
              placeholder: 'e.g., 7.5*10^10',
            },
          },
          'modelProperties.totalModelSize'
        ),
        modelSizeRange: createFieldSchema(
          {
            title: 'Model size range',
            component: 'Radio.Group',
            componentProps: {
              enum: [
                { label: '1-500M', value: '1-500M' },
                { label: '500M-5B', value: '500M-5B' },
                { label: '5B-15B', value: '5B-15B' },
                { label: '15B-50B', value: '15B-50B' },
                { label: '50B-100B', value: '50B-100B' },
                { label: '100B-500B', value: '100B-500B' },
              ],
            },
          },
          'modelProperties.modelSizeRange'
        ),
      },
    },
  },
};

const FormilyForm: React.FC = () => {
  const onSubmitSuccess = async (formData: any) => {
    message.success('Form submitted successfully!');
    // try {
    //   // 使用相对路径，将由 webpack devServer 代理
    //   const response = await fetch('/api/model-documentation', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }

    //   const result = await response.json();
    //   message.success('Form submitted successfully!');
    //   console.log('Server response:', result);
    // } catch (error) {
    //   console.error('Failed to submit form:', error);
    //   message.error('Failed to submit form. Please try again.');
    // }
  };

  const onSubmitFailed = (errors: any) => {
    console.error('Form validation errors:', errors);
    if (Array.isArray(errors) && errors.length > 0) {
      // 显示所有验证错误
      const errorMessages = errors.map(error => error.messages?.[0]).filter(Boolean);
      if (errorMessages.length > 0) {
        message.error({
          content: (
            <div>
              <div>Please fix the following errors:</div>
              <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                {errorMessages.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            </div>
          ),
          duration: 5, // 显示 5 秒
        });
      } else {
        message.error('Form validation failed. Please check your inputs.');
      }
    } else {
      message.error('Form validation failed. Please check your inputs.');
    }
  };

  const onSubmit = async (value: any) => {
    console.log('表单原始数据：', value);

    // 处理表单数据，确保正确的结构
    const processFormData = (data: any) => {
      const result: any = {};

      // 处理 documentInfo
      if (data.documentInfo) {
        result.documentInfo = {
          lastUpdated: data.documentInfo.lastUpdated,
          documentVersion: data.documentInfo.documentVersion,
        };
      }

      // 处理 generalInformation
      if (data.generalInformation) {
        result.generalInformation = {};
        Object.entries(data.generalInformation).forEach(([key, value]: [string, any]) => {
          if (value && typeof value === 'object') {
            const authorities = { aio: false, ncas: false, dps: false };

            // 合并所有可能的 authorities
            if (value.authorities) {
              Object.assign(authorities, value.authorities);
            }

            result.generalInformation[key] = {
              value: value.value || '',
              authorities,
            };
          }
        });
      }

      // 处理 modelProperties
      if (data.modelProperties) {
        result.modelProperties = {};
        Object.entries(data.modelProperties).forEach(([key, value]: [string, any]) => {
          if (value && typeof value === 'object') {
            const authorities = { aio: false, ncas: false, dps: false };

            // 合并所有可能的 authorities
            if (value.authorities) {
              Object.assign(authorities, value.authorities);
            }

            if (key.endsWith('Modalities')) {
              const modalityValue = value.value || {};
              const modalities = modalityValue.modalities || {
                text: { enabled: false, parameter: '' },
                images: { enabled: false, parameter: '' },
                audio: { enabled: false, parameter: '' },
                video: { enabled: false, parameter: '' },
              };

              // 确保每个模态都有完整的结构
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

              result.modelProperties[key] = {
                value: {
                  modalities,
                  customMetrics: modalityValue.customMetrics || [],
                },
                authorities,
              };
            } else {
              result.modelProperties[key] = {
                value: value.value || '',
                authorities,
              };
            }
          }
        });
      }

      return result;
    };

    const restructuredData = processFormData(value);
    console.log('重构后的数据：', restructuredData);

    try {
      const response = await fetch('/api/model-documentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restructuredData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      message.success('Form submitted successfully!');
      console.log('Server response:', result);
    } catch (error) {
      console.error('Failed to submit form:', error);
      message.error('Failed to submit form. Please try again.');
    }
  };

  return (
    <FormProvider form={form}>
      <Form
        form={form}
        layout="vertical"
        style={{
          width: '1000px',
          margin: '20px auto',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Model Documentation Form</h1>
        <div style={{ marginBottom: '24px', fontStyle: 'italic', fontSize: '14px' }}>
          This Form includes all the information to be documented as part of Measure 1.1.
          Information documented is intended for the AI Office (AIO), national competent authorities
          (NCAs) or downstream providers (DPs).
        </div>
        <SchemaField schema={schema} />
        <FormItem>
          <Space>
            <Submit
              onSubmit={onSubmit}
              onSubmitSuccess={onSubmitSuccess}
              onSubmitFailed={onSubmitFailed}
            >
              Submit
            </Submit>
            <Submit
              type="default"
              onClick={() => {
                try {
                  form.reset();
                  message.success('Form reset successfully');
                } catch (error) {
                  console.error('Error resetting form:', error);
                  message.error('Failed to reset form');
                }
              }}
            >
              Reset
            </Submit>
          </Space>
        </FormItem>
      </Form>
    </FormProvider>
  );
};

export default FormilyForm;
