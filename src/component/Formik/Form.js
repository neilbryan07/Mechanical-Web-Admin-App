import React from 'react';
import FormItem from "./FormItem";

import { Field } from "formik";

const Form = (props) => {

    return (
        <Field>
            {({ form: { handleReset, handleSubmit } }) => (
                <form
                    onReset={handleReset}
                    onSubmit={handleSubmit}
                    {...props}
                />
            )}
        </Field>
    )
}

Form.Item = FormItem;

export default Form;
