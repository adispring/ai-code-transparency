import React from 'react';
import { createForm } from '@formily/core';
import { FormProvider, Field } from '@formily/react';
import { Form, FormItem, Input, Select, Submit } from '@formily/antd';

const form = createForm();

const FormilyDemo: React.FC = () => {
  return (
    <FormProvider form={form}>
      <Form layout="vertical" labelCol={24} wrapperCol={24}>
        <Field
          name="username"
          title="用户名"
          required
          decorator={[FormItem]}
          component={[
            Input,
            {
              placeholder: '请输入用户名',
            },
          ]}
        />

        <Field
          name="role"
          title="角色"
          required
          decorator={[FormItem]}
          component={[
            Select,
            {
              placeholder: '请选择角色',
              options: [
                { label: '管理员', value: 'admin' },
                { label: '用户', value: 'user' },
              ],
            },
          ]}
        />

        <Field
          name="description"
          title="描述"
          decorator={[FormItem]}
          component={[
            Input.TextArea,
            {
              placeholder: '请输入描述',
            },
          ]}
        />

        <Submit
          onSubmit={(values) => {
            console.log('表单提交：', values);
          }}
        >
          提交
        </Submit>
      </Form>
    </FormProvider>
  );
};

export default FormilyDemo;
