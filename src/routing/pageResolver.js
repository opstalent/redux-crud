import CreateForm from '../page/CreateForm.js';
import UpdateForm from '../page/UpdateForm.js';
import EntityPage from '../page/EntityPage.js';

const componentMap = {
  add: CreateForm,
  edit: UpdateForm,
  show: EntityPage,
  list: 'div',
};

export default (type) => {
  if (componentMap[type]) {
    return componentMap[type];
  }

  throw new Error('Invalid type passed to resolver');
};
