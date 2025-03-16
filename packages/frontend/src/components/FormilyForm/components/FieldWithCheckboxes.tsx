import React from 'react';
import { Field, useField } from '@formily/react';
import { FormItem, Checkbox } from '@formily/antd-v5';
import type { Field as FieldType } from '@formily/core';

const FieldWithCheckboxes: React.FC<any> = props => {
  const { children } = props;
  const field = useField<FieldType>();

  React.useEffect(() => {
    const defaultValue = {
      value: '',
      authorities: {
        aio: false,
        ncas: false,
        dps: false,
      },
    };

    if (!field.value) {
      field.setValue(defaultValue);
    } else if (!field.value.authorities) {
      field.setValue({ ...field.value, authorities: defaultValue.authorities });
    }
  }, [field]);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
      <div style={{ flex: 1 }}>{children}</div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '8px', minWidth: '200px' }}>
        <Field
          name={`${field.address.toString()}.authorities.aio`}
          component={[Checkbox]}
          decorator={[FormItem, { feedbackLayout: 'none' }]}
        >
          AIO
        </Field>
        <Field
          name={`${field.address.toString()}.authorities.ncas`}
          component={[Checkbox]}
          decorator={[FormItem, { feedbackLayout: 'none' }]}
        >
          NCAs
        </Field>
        <Field
          name={`${field.address.toString()}.authorities.dps`}
          component={[Checkbox]}
          decorator={[FormItem, { feedbackLayout: 'none' }]}
        >
          DPs
        </Field>
      </div>
    </div>
  );
};

export default FieldWithCheckboxes;
