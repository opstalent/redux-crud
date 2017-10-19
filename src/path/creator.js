export default (url, action) => {
  if (['show', 'list', 'add', 'edit'].indexOf(action) === -1) {
    throw new Error('Invalid action provided to `pathCreator`');
  }

  const trimmed = url.replace(/\/?$/, '');

  return `${trimmed}/${action}`;
};
