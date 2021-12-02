export const styledCUtils = function<T, U extends keyof T>() {
  return (property: U, defaultValue: string | number = '') => (props: T) =>
    props[property] ? props[property] : defaultValue;
};

export default styledCUtils;
// (props) => (props.property ? props.property : defaultValue)
