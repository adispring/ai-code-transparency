import { createFieldSchema, createModalityFieldSchema } from './fieldSchemas';

export const schema = {
  type: 'object',
  properties: {
    documentInfo: {
      type: 'void',
      'x-component': 'TableContainer',
      'x-component-props': {
        title: 'Document Information',
      },
      properties: {
        grid: {
          type: 'void',
          'x-component': 'FormGrid',
          'x-component-props': {
            minColumns: 2,
            maxColumns: 2,
            columnGap: 24,
          },
          properties: {
            lastUpdated: {
              type: 'string',
              title: 'Date the document was last updated',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'DatePicker',
            },
            documentVersion: {
              type: 'string',
              title: 'Document version number',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: 'e.g., 1.0.0',
              },
            },
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
              'The list of other general-purpose AI models that the model builds upon, if any (e.g. the list for llama-3.1-nemotron-70b would be [llama-3.1] and the list for llama-3.1 would be empty). For each listed model dependency, please include a copy or link to the associated Model Documentation or indicate that the Model Documentation is not accessible.',
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
        modelArchitectureWithRisk: createFieldSchema(
          {
            title: 'Model architecture with risk',
            description:
              "If the model is a general-purpose AI model with systemic risk, provide a detailed description of the model architecture, specifying where it departs from standard architectures where applicable. If the model is not a general-purpose AI model with systemic risk, write 'N/A'.",
            component: 'Input.TextArea',
          },
          'modelProperties.modelArchitectureWithRisk'
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
            description:
              "For each selected modality, please include maximum input size or write 'N/A' if not defined.",
          },
          'modelProperties.inputModalities'
        ),
        outputModalities: createModalityFieldSchema(
          {
            title: 'Output modalities',
            description:
              "For each selected modality, please include maximum output size or write 'N/A' if not defined.",
          },
          'modelProperties.outputModalities'
        ),
        totalModelSize: createFieldSchema(
          {
            title: 'Total model size',
            description:
              'The total number of parameters of the model, recorded with at least two significant figures, e.g 7.5*10^10 parameters',
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
            description: 'Select the range that the total number of parameters belongs to',
            component: 'Radio',
            componentProps: {
              options: [
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
