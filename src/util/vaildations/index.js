const VAILTIOND_RULS = {
  isNumber: /^\d+$/,
  isName: /^[a-zA-z ,.'-]+$/,
  isEmail: /^\w+@\w+.\w+$/,
};

export const VAILTIOND_FORM = {
  NAME: {
    requried: "This feild requried",
    pattern: {
      value: VAILTIOND_RULS.isName,
      message: "This feild should be number",
    },
  },
  EMAIL: {
    requried: "This feild requried",
    pattern: {
      value: VAILTIOND_RULS.isEmail,
      message: "This feild should be Email",
    },
  },
};

export default VAILTIOND_FORM;
