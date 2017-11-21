import FlatFieldDescription from './field/FlatFieldDescription.js';

const componentsMap = {
  date: FlatFieldDescription,
  datetime: FlatFieldDescription,
  email: FlatFieldDescription,
  number: FlatFieldDescription,
  text: FlatFieldDescription,
}
export default (type) => {
  if (componentsMap[type]) {
    return componentsMap[type];
  }

  throw new Error('Invalid argument passed to `entityAttributeResolver`');
};
