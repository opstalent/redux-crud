const pattern = /(?:(^|\/){)([^}]+)(?:}(\/|$))/;
const replace = '$1:$2$3';

export default path => path.replace(pattern, replace);
