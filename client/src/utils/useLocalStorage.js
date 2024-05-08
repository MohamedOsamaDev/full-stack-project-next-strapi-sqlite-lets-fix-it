export const useLocalStorage = (name) => {
  //   const stringifiedUser = localStorage.get() || '""';
  //   return JSON.parse(stringifiedUser || {});

  const setItem = (key, value) => {
    if (!key || !value) return;
    localStorage.setItem(key, value);
  };
  const getItem = (key) => {
    if (!key) return;
    return localStorage.getItem(key);
  };
  const removeItem = (key) => {
    if (!key) return;
    localStorage.removeItem(key);
  };
  return {
    setItem,
    getItem,
    removeItem,
  };
};

