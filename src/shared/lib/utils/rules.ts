export const requiredField = [
  {
    validate: (value: string) => value.length >= 1,
    message: "Обязательное поле",
  },
];
