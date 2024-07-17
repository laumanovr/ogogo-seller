// TODO: add try catch for import
export const findComponent = (path: string, fileName: string) => () =>
  import(`../../../pages/${path}/ui/${fileName}.vue`);
