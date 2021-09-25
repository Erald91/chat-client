const browserLocalStorage = (key) => {
  const get = () => {
    const item = localStorage.getItem(key);
    try {
      return JSON.parse(item);
    } catch (error) {
      return item;
    }
  }
  const set = (payload) => {
    localStorage.setItem(key, JSON.stringify(payload));
  }
  const remove = () => {
    localStorage.removeItem(key);
  }
  return {get, set, remove};
};

export default browserLocalStorage;
