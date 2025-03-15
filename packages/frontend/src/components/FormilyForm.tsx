import React from 'react';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField, Field } from '@formily/react';
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
const FieldWithCheckboxes: React.FC<any> = (props) => {
  const { children, basePath } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        {children}
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '8px', minWidth: '200px' }}>
        <Field
          name={`${basePath}.authorities.aio`}
          component={[Checkbox]}
          decorator={[FormItem]}
        >
          AIO
        </Field>
        <Field
          name={`${basePath}.authorities.ncas`}
          component={[Checkbox]}
          decorator={[FormItem]}
        >
          NCAs
        </Field>
        <Field
          name={`${basePath}.authorities.dps`}
          component={[Checkbox]}
          decorator={[FormItem]}
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
      <div style={{ 
        border: '1px solid #f0f0f0',
        borderRadius: '8px',
        padding: '24px',
        backgroundColor: '#fff',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {children}
        </div>
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

// 修改 schema 中的字段，添加自定义包装组件
const wrapWithCheckboxes = (fieldSchema: any, fieldName: string) => {
  const { title, description, properties, ...rest } = fieldSchema;
  const isModalityField = fieldName.endsWith('Modalities');

  if (isModalityField) {
    return {
      type: 'object',
      properties: {
        value: {
          type: 'object',
          title,
          'x-decorator': 'FormItem',
          properties: {
            modalities: {
              type: 'object',
              properties: {
                text: {
                  type: 'object',
                  'x-component': 'FormItem',
                  'x-component-props': {
                    style: { display: 'flex', alignItems: 'center', gap: '16px' }
                  },
                  properties: {
                    enabled: {
                      type: 'boolean',
                      'x-component': 'Checkbox',
                      'x-content': 'Text',
                      'x-decorator': 'FormItem',
                      'x-decorator-props': {
                        feedbackLayout: 'none'
                      }
                    },
                    parameter: {
                      type: 'string',
                      title: 'Parameter',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                      'x-component-props': {
                        placeholder: 'e.g., Maximum number of tokens'
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
                    style: { display: 'flex', alignItems: 'center', gap: '16px' }
                  },
                  properties: {
                    enabled: {
                      type: 'boolean',
                      'x-component': 'Checkbox',
                      'x-content': 'Images',
                      'x-decorator': 'FormItem',
                      'x-decorator-props': {
                        feedbackLayout: 'none'
                      }
                    },
                    parameter: {
                      type: 'string',
                      title: 'Parameter',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                      'x-component-props': {
                        placeholder: 'e.g., Maximum image resolution'
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
                    style: { display: 'flex', alignItems: 'center', gap: '16px' }
                  },
                  properties: {
                    enabled: {
                      type: 'boolean',
                      'x-component': 'Checkbox',
                      'x-content': 'Audio',
                      'x-decorator': 'FormItem',
                      'x-decorator-props': {
                        feedbackLayout: 'none'
                      }
                    },
                    parameter: {
                      type: 'string',
                      title: 'Parameter',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                      'x-component-props': {
                        placeholder: 'e.g., Maximum audio duration'
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
                    style: { display: 'flex', alignItems: 'center', gap: '16px' }
                  },
                  properties: {
                    enabled: {
                      type: 'boolean',
                      'x-component': 'Checkbox',
                      'x-content': 'Video',
                      'x-decorator': 'FormItem',
                      'x-decorator-props': {
                        feedbackLayout: 'none'
                      }
                    },
                    parameter: {
                      type: 'string',
                      title: 'Parameter',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                      'x-component-props': {
                        placeholder: 'e.g., Maximum video length'
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
                      placeholder: 'Enter metric name'
                    }
                  },
                  parameter: {
                    type: 'string',
                    title: 'Parameter',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-component-props': {
                      placeholder: 'Enter parameter value'
                    }
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
      'x-decorator': 'FieldWithCheckboxes',
      'x-decorator-props': {
        basePath: fieldName,
      },
    };
  }

  return {
    type: 'object',
    properties: {
      value: {
        ...rest,
        title,
        description,
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
    'x-decorator': 'FieldWithCheckboxes',
    'x-decorator-props': {
      basePath: fieldName,
    },
  };
};

const createModalitySchema = (prefix: string) => ({
  properties: {
    modalities: {
      type: 'void',
      'x-component': 'FormItem',
      properties: {
        text: {
          type: 'void',
          'x-component': 'FormItem',
          'x-component-props': {
            style: { display: 'flex', alignItems: 'center', gap: '16px' }
          },
          properties: {
            enabled: {
              type: 'boolean',
              'x-component': 'Checkbox',
              'x-content': 'Text',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackLayout: 'none'
              }
            },
            parameter: {
              type: 'string',
              title: 'Parameter',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: 'e.g., Maximum number of tokens'
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
          type: 'void',
          'x-component': 'FormItem',
          'x-component-props': {
            style: { display: 'flex', alignItems: 'center', gap: '16px' }
          },
          properties: {
            enabled: {
              type: 'boolean',
              'x-component': 'Checkbox',
              'x-content': 'Images',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackLayout: 'none'
              }
            },
            parameter: {
              type: 'string',
              title: 'Parameter',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: 'e.g., Maximum image resolution'
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
          type: 'void',
          'x-component': 'FormItem',
          'x-component-props': {
            style: { display: 'flex', alignItems: 'center', gap: '16px' }
          },
          properties: {
            enabled: {
              type: 'boolean',
              'x-component': 'Checkbox',
              'x-content': 'Audio',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackLayout: 'none'
              }
            },
            parameter: {
              type: 'string',
              title: 'Parameter',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: 'e.g., Maximum audio duration'
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
          type: 'void',
          'x-component': 'FormItem',
          'x-component-props': {
            style: { display: 'flex', alignItems: 'center', gap: '16px' }
          },
          properties: {
            enabled: {
              type: 'boolean',
              'x-component': 'Checkbox',
              'x-content': 'Video',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackLayout: 'none'
              }
            },
            parameter: {
              type: 'string',
              title: 'Parameter',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: 'e.g., Maximum video length'
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
              placeholder: 'Enter metric name'
            }
          },
          parameter: {
            type: 'string',
            title: 'Parameter',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: 'Enter parameter value'
            }
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
});

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
            placeholder: 'e.g., 1.0.0'
          }
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
        legalName: wrapWithCheckboxes({
          type: 'string',
          title: 'Legal name for the model provider',
          required: true,
          'x-component': 'Input',
          'x-component-props': {
            placeholder: 'e.g., OpenAI Corporation'
          }
        }, 'generalInformation.legalName'),
        modelFamily: wrapWithCheckboxes({
          type: 'string',
          title: 'Model family',
          description: 'The identifier, if any, for the collection of models (e.g. Llama)',
          required: true,
          'x-component': 'Input',
          'x-component-props': {
            placeholder: 'e.g., GPT, Llama, PaLM'
          }
        }, 'generalInformation.modelFamily'),
        versionedModel: wrapWithCheckboxes({
          type: 'string',
          title: 'Versioned model',
          description: 'The unique identifier for the model (e.g. Llama 3.1-40B)',
          required: true,
          'x-component': 'Input',
          'x-component-props': {
            placeholder: 'e.g., GPT-4-32k, Llama-2-70B'
          }
        }, 'generalInformation.versionedModel'),
        modelAuthenticity: wrapWithCheckboxes({
          type: 'string',
          title: 'Model authenticity',
          description: 'Evidence that establishes the provenance and authenticity of the model (e.g. a secure hash if binaries are distributed, the URL endpoint in the case of a service), where available',
          'x-component': 'Input.TextArea',
          'x-component-props': {
            placeholder: 'e.g., SHA-256: 7d5e..., or API endpoint: https://api.example.com/v1'
          }
        }, 'generalInformation.modelAuthenticity'),
        releaseDate: wrapWithCheckboxes({
          type: 'string',
          title: 'Release date',
          description: 'Date when the model was first distributed through any distribution channel',
          'x-component': 'DatePicker',
        }, 'generalInformation.releaseDate'),
        unionMarketRelease: wrapWithCheckboxes({
          type: 'string',
          title: 'Union market release',
          description: 'Date when the model was placed on the Union market',
          'x-component': 'DatePicker',
        }, 'generalInformation.unionMarketRelease'),
        modelDependencies: wrapWithCheckboxes({
          type: 'string',
          title: 'Model dependencies',
          description: 'The list of other general-purpose AI models that the model builds upon, if any',
          'x-component': 'Input.TextArea',
          'x-component-props': {
            placeholder: 'e.g., Base model: Llama-2, Fine-tuned with: RLHF'
          }
        }, 'generalInformation.modelDependencies'),
      },
    },
    modelProperties: {
      type: 'void',
      'x-component': 'TableContainer',
      'x-component-props': {
        title: 'Model Properties',
      },
      properties: {
        modelArchitecture: wrapWithCheckboxes({
          type: 'string',
          title: 'Model architecture',
          description: 'A general description of the model architecture, e.g. a transformer architecture. (Recommended 20 words)',
          required: true,
          'x-component': 'Input.TextArea',
          'x-component-props': {
            placeholder: 'e.g., Decoder-only transformer architecture with multi-head attention and feed-forward networks'
          }
        }, 'modelProperties.modelArchitecture'),
        designSpecification: wrapWithCheckboxes({
          type: 'string',
          title: 'Design specification of the model',
          description: 'A general description of the key design choices of the model, including rationale and assumptions made, to provide better understanding of the model. (Recommended 100 words)',
          'x-component': 'Input.TextArea',
          'x-component-props': {
            placeholder: 'e.g., The model uses a scaled-up transformer architecture with improvements in attention mechanism...'
          }
        }, 'modelProperties.designSpecification'),
        inputModalities: wrapWithCheckboxes({
          title: 'Input modalities',
        }, 'modelProperties.inputModalities'),
        outputModalities: wrapWithCheckboxes({
          title: 'Output modalities',
        }, 'modelProperties.outputModalities'),
        totalModelSize: wrapWithCheckboxes({
          type: 'string',
          title: 'Total model size',
          description: 'The total number of parameters of the model, recorded with at least two significant figures, e.g 7.5*10^10',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: 'e.g., 7.5*10^10'
          }
        }, 'modelProperties.totalModelSize'),
        modelSizeRange: wrapWithCheckboxes({
          type: 'string',
          title: 'Model size range',
          'x-component': 'Radio.Group',
          enum: [
            { label: '1-500M', value: '1-500M' },
            { label: '500M-5B', value: '500M-5B' },
            { label: '5B-15B', value: '5B-15B' },
            { label: '15B-50B', value: '15B-50B' },
            { label: '50B-100B', value: '50B-100B' },
            { label: '100B-500B', value: '100B-500B' },
          ],
        }, 'modelProperties.modelSizeRange'),
      },
    },
  },
};

const FormilyForm: React.FC = () => {
  const onSubmitSuccess = async (formData: any) => {
    try {
      // 这里替换为你的实际 API 端点
      const response = await fetch('/api/model-documentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      message.success('Form submitted successfully!');
      console.log('Server response:', result);
      
      // 可选：提交成功后重置表单
      // form.reset();
    } catch (error) {
      console.error('Failed to submit to server:', error);
      message.error('Failed to submit data to server. Please try again.');
    }
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

  const onSubmit = () => {
    form.submit(onSubmitSuccess)
      .catch(onSubmitFailed);
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
          This Form includes all the information to be documented as part of Measure 1.1. Information documented is intended for the AI Office (AIO), national competent authorities (NCAs) or downstream providers (DPs).
        </div>
        <SchemaField schema={schema} />
        <FormItem>
          <Space>
            <Submit onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} onSubmitFailed={onSubmitFailed}>Submit</Submit>
            <Submit type="default" onClick={() => {
              try {
                form.reset();
                message.success('Form reset successfully');
              } catch (error) {
                console.error('Error resetting form:', error);
                message.error('Failed to reset form');
              }
            }}>
              Reset
            </Submit>
          </Space>
        </FormItem>
      </Form>
    </FormProvider>
  );
};

export default FormilyForm; 