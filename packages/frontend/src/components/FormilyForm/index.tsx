import React from 'react';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';
import type { IFormFeedback } from '@formily/core';
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
  FormGrid,
} from '@formily/antd-v5';
import { schema } from './schemas/formSchema';
import { processFormData } from './utils/formUtils';
import TableContainer from './components/TableContainer';
import FieldWithCheckboxes from './components/FieldWithCheckboxes';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
    DatePicker,
    NumberPicker,
    Radio: Radio.Group,
    Checkbox,
    ArrayItems,
    FieldWithCheckboxes,
    TableContainer,
    FormGrid,
  },
});

const form = createForm();

const FormilyForm: React.FC = () => {
  const onSubmitSuccess = async (formData: any) => {
    message.success('Form submitted successfully!');
  };

  const onSubmitFailed = (errors: IFormFeedback[]) => {
    if (errors.length > 0) {
      const errorMessages = errors
        .map(error => `${error.path}: ${error.messages?.[0]}`)
        .filter(Boolean);

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
          duration: 10,
        });
      } else {
        message.error('Form validation failed. Please check your inputs.');
      }
    } else {
      message.error('Form validation failed. Please check your inputs.');
    }
  };

  const onSubmit = async (value: any) => {
    console.log('Original form data:', JSON.stringify(value));
    const restructuredData = processFormData(value);
    console.log('Restructured data:', restructuredData);

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
