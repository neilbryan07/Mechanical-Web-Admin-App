import React from 'react';
import chroma from 'chroma-js';

import Select , { StylesConfig } from 'react-select';

import { Field } from 'formik';

const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma("#36B37E");
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma("#36B37E");
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "green",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "red",
      ':hover': {
        backgroundColor: "red",
        color: 'white',
      },
    }),
  };

const FormikSelect = React.forwardRef(({
    name,
    validate,
    fast,
    children,
    onChange,
    onBlur,
    isDisabled,
    ...restProps
} , ref ) => {
    return (
        <Field name={name} validate={validate} fast={fast}>
            {({
                field: { value },
                form: { setFieldValue, setFieldTouched },
            }) => (
                <Select
                    ref={ref}
                    styles={colourStyles}
                    onChange={(value, option) => {
                        setFieldValue(name, value)
                        onChange && onChange(value, option)
                    }}
                    onBlur={(value) => {
                        setFieldTouched(name)
                        onBlur && onBlur(value.value)
                    }}
                    value={value === '' || value === null ? undefined : value}
                    className={`custom-input ${restProps?.className}`}
                    isDisabled={isDisabled}
                    {...restProps}
                >
                    {children ? children : <></>}
                </Select>
            )}
        </Field>
    );
});

export default FormikSelect;