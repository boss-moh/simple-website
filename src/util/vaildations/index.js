const VAILTIOND_RULS = {
  isNumber: /^\d+$/,
  isName: /^[a-zA-z ,.'-]+$/,
  isEmail: /^\w+@\w+.\w+$/,
};

export const VAILTIOND_FORM = {
  NAME: {
    required: "This feild requried",
    pattern: {
      value: VAILTIOND_RULS.isName,
      message: "This feild should be number",
    },
  },
  EMAIL: {
    required: "This feild requried",
    pattern: {
      value: VAILTIOND_RULS.isEmail,
      message: "This feild should be Email",
    },
  },
  TEXT: {
    required: "This feild requried",
  },
};

export default VAILTIOND_FORM;
