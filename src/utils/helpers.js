export const cloneDeep = (object) => JSON.parse(JSON.stringify(object));

export const clearProps = (dataObject, props = []) => {
  const clone = cloneDeep(dataObject);
  props.forEach(prop => {
    if (clone.hasOwnProperty(prop)) {
      delete clone[prop];
    }
  });
  return clone;
};

export const genUniqueID = () => {
  return (Math.floor(Math.random() * 1000) * Date.now()).toString(32);
};

export const scrollBottom = (element) => {
  element.scrollTop = element.scrollHeight - element.clientHeight;
};
