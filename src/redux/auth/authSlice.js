import { createSlice } from "@reduxjs/toolkit"
import { createAccount, forgotPassword, getMe, login, resetPassword } from "./authThunk"

const initialState = {
    loading: false,
    status: "pending",
    error: undefined,
    token: null,
    loginForm: {
        username: "",
        password: ""
    },
    registerFormError: undefined,
    registerForm: {
        first_name: "",
        last_name: "",
        middle_name: "",
        phoneNumber: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    },
    forgotPasswordFormError: undefined,
    forgotPasswordForm: {
        email: ""
    },
    resetPasswordFormError: undefined,
    resetPasswordForm: {
        new_password: "",
        confirm_new_password: ""
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setLoginForm: (state, action) => {
            state.loginForm = action.payload
        }
    },
    extraReducers: (builder) => {
        //-----------------------------Start Get Me-----------------------------
        builder
            .addCase(getMe.pending, (state) => {
                state.status = "pending";
                state.loading = true;
                state.error = undefined
            })
            .addCase(getMe.fulfilled, (state, action) => {
                // debugger;
                state.loading = false;
                state.status = "fulfilled";
                // state.error = action.payload;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.loading = false;
                // state.error = action.payload;
                state.status = "rejected";
            });
        //-----------------------------End Get Me-----------------------------
        //-----------------------------Start Login-----------------------------
        builder
            .addCase(login.pending, (state) => {
                state.status = "pending";
                state.loading = true;
                state.error = undefined
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "fulfilled";

                if (action?.payload?.message?.toLowerCase() === "The password you entered is invalid".toLowerCase()) {
                    state.error = { error: true, message: "Oops! It seems there's an issue with the email or password. Double-check your information and try once more." }
                } else {
                    state.error = action.payload
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";

                if (action?.payload?.message?.toLowerCase() === "The password you entered is invalid".toLowerCase()) {
                    state.error = { error: true, message: "Oops! It seems there's an issue with the email or password. Double-check your information and try once more." }
                } else {
                    state.error = action.payload
                }
            });
        //-----------------------------End Login-----------------------------
        //-----------------------------Start Register-----------------------------
        builder
            .addCase(createAccount.pending, (state) => {
                state.status = "pending";
                state.loading = true;
                state.registerFormError = undefined
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "fulfilled";
                state.registerFormError = action.payload;
            })
            .addCase(createAccount.rejected, (state, action) => {
                state.loading = false;
                state.registerFormError = action.payload;
                state.status = "rejected";
            });
        //-----------------------------End Register-----------------------------
        //-----------------------------Start Forgot Password-----------------------------
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.status = "pending";
                state.loading = true;
                state.forgotPasswordFormError = undefined
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "fulfilled";
                state.forgotPasswordFormError = action.payload;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.forgotPasswordFormError = action.payload;
                state.status = "rejected";
            });
        //-----------------------------End Forgot Password-----------------------------
            //-----------------------------Start Reset Password-----------------------------
            builder
            .addCase(resetPassword.pending, (state) => {
                state.status = "pending";
                state.loading = true;
                state.resetPasswordFormError = undefined
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "fulfilled";
                state.resetPasswordFormError = action.payload;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.resetPasswordFormError = action.payload;
                state.status = "rejected";
            });
        //-----------------------------End Reset Password-----------------------------
    }
});

export const authAction = authSlice.actions;
export default authSlice.reducer;