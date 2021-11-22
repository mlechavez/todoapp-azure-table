type Type = "localStorage" | "sessionStorage" | number;

const setItem = (key: string, value: any, type: Type) => {
  if (!key) {
    throw Error("key is required");
  }
  let storage = window[type] as Storage;
  if (typeof value === "object") {
    storage.setItem(key, JSON.stringify(value));
  } else {
    storage.setItem(key, value);
  }
};

const getItem = (key: string, type: Type) => {
  if (!key) throw Error("key is required");
  let storage = window[type] as Storage;

  const item = storage.getItem(key);
  if (item != null && typeof item === "object") return JSON.parse(item);
  if (typeof item === "string") return item;
  return null;
};

const removeItem = (key: string, type: Type) => {
  if (!key) throw Error("key is required");
  let storage = window[type] as Storage;
  storage.removeItem(key);
};

const clear = (type: Type) => {
  let storage = window[type] as Storage;
  storage.clear();
};

const storageService = {
  setItem,
  getItem,
  removeItem,
  clear,
};

export default storageService;
