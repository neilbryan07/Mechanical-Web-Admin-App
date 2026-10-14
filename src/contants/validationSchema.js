import * as Yup from 'yup';

export const AppointmentValidationSchema = Yup.object().shape({

    // start_date: Yup.string().required('Drop off Date and Time is a required field'),
    // target_completion_date: Yup.string().required('Target Completion Date is a required field'),

    // full_name: Yup.string().required('Customer Full Name is a required field'),
    // address: Yup.string().required('Customer Address is a required field'),
    // phone_number: Yup.string().required('Customer Phone Number is a required field'),
    // email_address: Yup.string().required('Customer Email Address is a required field'),

    // claim_number: Yup.string().required('Insurance Claim No. is a required field'),
    // provider: Yup.string().required('Insured Full Name is a required field'),
    // policy_number: Yup.string().required('Policy Number is a required field'),
    // adjuster_name: Yup.string().required('Insured Adjuster Name is a required field'),
    // adjuster_phone_number: Yup.string().required('Insured Phone Number is a required field'),
    // adjuster_email_address: Yup.string().required('Insured Email Address is a required field'),

    // model_year: Yup.string().required('Vehicle Year is a required field'),
    // vin_number: Yup.string().required('Vehicle Vin Number is a required field'),
    // make: Yup.string().required('Vehicle Make is a required field'),
    // model: Yup.string().required('Vehicle Model is a required field'),
    // color: Yup.string().required('Vehicle Color is a required field'),
    // mileage: Yup.string().required('Vehicle Mileage is a required field'),

    // repair_description: Yup.string().required('Repair Description is a required field'),
    // damage_level: Yup.string().required('Damage Level is a required field'),
    // amount: Yup.string().required('Amount of Conventional Repair is a required field'),

});


export const AppointmentformValue = {

    start_date : '',
    start_time : '',
    target_completion_date : '',
    repair_description: '',
    damage_level: '',
    parts: [],
    amount: '',
    notes: '',

    full_name : '',
    address : '',
    phone_number : '',
    email_address : '',

    provider: '',
    claim_number: '',
    adjuster_name: '',
    adjuster_phone_number: '',
    adjuster_email_address: '',
    policy_number : '',
    created_by: 'user_id',

    vin_number: '',
    model_year: '',
    make: '',
    model:'',
    color: '',
    note: '',
    mileage: '',
}