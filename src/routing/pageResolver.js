import CreateForm from '../page/CreateForm.js';
import UpdateForm from '../page/UpdateForm.js';

export default (type) => {
  switch(type) {
    case 'add':
      return CreateForm;
    case 'edit':
      return UpdateForm;
    case 'show':
    case 'list':
      return 'div';
    default:
      throw new Error('Invalid type passed to resolver');
  }
};
