import React from 'react';
import { Field, getIn } from 'formik'
import SubHeader from '../Typography/SubHeader';

const FormItem = ({
    name,
    showValidateSuccess,
    showInitialErrorAfterTouched = false,
    children,
    validate,
    ...restProps
}) => {

    return (
        <Field name={name} validate={validate}>
            {({ form: { errors, touched, initialErrors } }) => {
                const error = getIn(errors, name, undefined);
                const initialError = getIn(initialErrors, name, undefined);

                let isTouched = getIn(touched, name, false);

                if (Array.isArray(isTouched)) {
                    isTouched =
                        isTouched.length === 0
                            ? true
                            : isTouched.reduce((acc, value) => acc || value, false)
                }

                const hasError = error !== undefined && isTouched;
                const hasInitialError = initialError !== undefined;

                const isValid = !error && isTouched;
                const showHelp =
                    hasError ||
                    (hasInitialError && (!isTouched || showInitialErrorAfterTouched));

                return (
                    <div
                        name={name}
                        {...restProps}
                        className={`${restProps?.className} ${hasError || (hasInitialError && !isTouched)
                            ? 'error'
                            : isValid && showValidateSuccess
                                ? 'success'
                                : undefined} mb-5`}
                    >
                        <span>
                            <SubHeader>
                                {restProps?.label}
                            </SubHeader>
                        </span>

                        {children}

                        {hasError && <li className='list-none text-[red]'>{error}</li>}
                        {hasInitialError &&
                            (!isTouched || showInitialErrorAfterTouched) && (
                                <li className='list-none text-[red] '>{initialError}</li>
                            )}
                    </div>
                )
            }}
        </Field>
    )
}

export default FormItem;