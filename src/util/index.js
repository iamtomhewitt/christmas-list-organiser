export const generateClass = (clazz) => (window.innerWidth < 480 ? `${clazz}-mobile` : clazz);

export default generateClass;
