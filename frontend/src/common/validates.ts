export const validateConfig = {
  required: { required: "必須項目です" },
  maxLength(length: number) {
    return {
      maxLength: {
        value: length,
        message: `${length}文字以内で入力してください`,
      },
    };
  },
  minLength(length: number) {
    return {
      minLength: {
        value: length,
        message: `${length}文字以上で入力してください`,
      },
    };
  },
};
