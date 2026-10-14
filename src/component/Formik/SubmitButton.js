import React from 'react';

import { Field } from 'formik'
import { LoadingButton } from '@mui/lab';
import { CircularProgress } from '@mui/material';


const SubmitButton = ({ loading, children, ...restProps }) => {
    return (
        <Field>
            {({ form: { isSubmitting, isValid, dirty, submitCount } }) => {
                isSubmitting = loading;

                return (
                    <button
                        type='submit'
                        disabled={!isValid && (dirty || submitCount > 0)}
                        {...restProps}
                    >
                        <div className='flex justify-center	items-center'>
                            {isSubmitting &&
                                <div className='mr-2'>
                                    <CircularProgress color='inherit' size={20} />
                                </div>
                            }
                            {children}
                        </div>
                    </button>

                )
            }}
        </Field>
    )
}

export default SubmitButton;
