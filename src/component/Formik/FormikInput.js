import React, { useState } from "react";
import { Field } from "formik";
import { AiFillEye } from "@react-icons/all-files/ai/AiFillEye";
import { AiFillEyeInvisible } from "@react-icons/all-files/ai/AiFillEyeInvisible";


const FormikInput = React.forwardRef((
    {
        name,
        validate,
        fast,
        onChange: $onChange,
        onBlur: $onBlur,
        ...restProps
    },
    ref,
) => {

    return (
        <Field name={name} validate={validate} fast={fast}>
            {({
                field: { value, onChange, onBlur }
            }) => {

                return (
                    <input
                        ref={ref}
                        name={name}
                        value={value}
                        onChange={(event) => {
                            onChange(event);
                            $onChange && $onChange(event);
                        }}
                        onBlur={(event) => {
                            onBlur(event);
                            $onBlur && $onBlur(event);
                        }}
                        {...restProps}
                        className={`custom-input w-full focus:outline-none focus:border-green-700 rounded-lg border py-3 px-4 my-2 ${restProps.className}`}
                    />
                )
            }}
        </Field>
    );
});

const TypeInput = FormikInput;

TypeInput.Password = React.forwardRef((
    {
        name,
        validate,
        fast,
        onChange: $onChange,
        onBlur: $onBlur,
        ...restProps
    },
    ref
) => {
    const [show, setShow] = useState();

    return (
        <Field name={name} validate={validate} fast={fast}>
            {({ field: { value, onChange, onBlur } }) => (
                <div div className="relative">
                    <input
                        ref={ref}
                        name={name}
                        value={value}
                        onChange={(event) => {
                            onChange(event);
                            $onChange && $onChange(event);
                        }}
                        onBlur={(event) => {
                            onBlur(event);
                            $onBlur && $onBlur(event);
                        }}
                        className="custom-input w-full focus:outline-none focus:border-green-700 rounded-lg border py-3 px-4 my-2"
                        {...restProps}
                        type={show ? 'text' : 'password'}
                    />
                    <span
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShow(!show)}
                    >
                        {show ?
                            <AiFillEye className="!text-[#e5e7eb]" size={25} />
                            :
                            <AiFillEyeInvisible className="!text-[#e5e7eb]" size={25} />
                        }
                    </span>
                </div>
            )
            }
        </Field >
    )
});


TypeInput.TextArea = React.forwardRef((
    {
        name,
        validate,
        fast,
        onChange: $onChange,
        onBlur: $onBlur,
        ...restProps
    },
    ref
) => {
    return (
        <Field name={name} validate={validate} fast={fast}>
            {({ field: { value, onChange, onBlur } }) => (
                <div div className="relative">
                    <textarea
                        ref={ref}
                        name={name}
                        value={value}
                        onChange={(event) => {
                            onChange(event);
                            $onChange && $onChange(event);
                        }}
                        onBlur={(event) => {
                            onBlur(event);
                            $onBlur && $onBlur(event);
                        }}
                        className="custom-input w-full focus:outline-none focus:border-green-700 rounded-lg border py-3 px-4 my-2"
                        {...restProps}
                    />
                </div>
            )
            }
        </Field >
    )
});


export default FormikInput;