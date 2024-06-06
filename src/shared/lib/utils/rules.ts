export const requiredField = (value: any) => {
  return (value && value.length >= 1) || "Обязательное поле";
};
