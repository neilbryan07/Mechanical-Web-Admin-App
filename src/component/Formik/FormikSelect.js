import React from 'react';
import Select from 'react-select';
import { Field } from 'formik';

const FormikSelect = React.forwardRef(({
    name,
    validate,
    fast,
    children,
    onChange,
    onBlur,
    isDisabled,
    defaultValue, // Renamed for clarity
    ...restProps
}, ref) => {
    return (
        <Field name={name} validate={validate} fast={fast}>
            {({
                field: { value },
                form: { setFieldValue, setFieldTouched },
            }) => {

                // Determine the default value
                // const selectedValue = value ? restProps?.options?.find(option => option.value === value) : restProps?.defaultValue;
                const selectedValue = value ? restProps?.options?.find(option => option.value === value)
                    : defaultValue
                        ? restProps?.options?.find(option => option.value === defaultValue) || null // Find the default option object
                        : null;

                return (
                    <Select
                        ref={ref}
                        onChange={(selectedOption) => {
                            setFieldValue(name, selectedOption?.value);
                            onChange && onChange(selectedOption?.value, selectedOption);
                        }}
                        onBlur={() => {
                            setFieldTouched(name);
                            onBlur && onBlur(value);
                        }}
                        value={selectedValue || null}
                        className={`custom-input ${restProps?.className}`}
                        isDisabled={isDisabled}
                        {...restProps}
                    >
                        {children ? children : <></>}
                    </Select>
                )
            }}
        </Field>
    );
});

export default FormikSelect;