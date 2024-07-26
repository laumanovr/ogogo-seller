export const findComponent = (path: string, fileName: string) => async () => {
  try {
    const module = await import(`../../../pages/${path}/ui/${fileName}.vue`);
    return module;
  } catch (error) {
    console.error(
      `Failed to import component at ../../../pages/${path}/ui/${fileName}.vue`,
      error
    );
    throw error;
  }
};
