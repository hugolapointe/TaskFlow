export const required = {
    message: 'This field is required.',
    rule: (value) => {
        return value.trim() !== ``;
    },
};

export const validateDate = {
    message: 'The date cannot be in the past.',
    rule: (value) => {
        return new Date(value) >= new Date().getDate();
    },
};
