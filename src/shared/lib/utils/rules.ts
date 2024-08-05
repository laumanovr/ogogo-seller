import i18n from "@/shared/lib/plugins/i18n";

// TODO: Later we need to write test for this func
export const requiredField = (value: any) => {
  return (
    (value && value.length >= 1) ||
    (value !== undefined && value !== null && value !== "") ||
    Number(value) ||
    i18n.global.t("lang-ae6e60da-0ad7-4adb-af28-3e12950a0022")
  );
};
