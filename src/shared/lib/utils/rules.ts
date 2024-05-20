export const requiredField = [
  {
    validate: (value: any) => value || value.length >= 1,
    message: "Обязательное поле",
  },
];
