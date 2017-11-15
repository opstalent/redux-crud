import CreateForm from '../page/CreateForm.js';

export default (type) => {
  switch(type) {
    case 'add':
      return CreateForm;
    case 'show':
    case 'edit':
    case 'list':
      return 'div';
    default:
      throw new Error('Invalid type passed to resolver');
  }
};
