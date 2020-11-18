/* eslint-disable no-underscore-dangle */
/**
 * @module deepFind
 * @description allows for deepsearching within an object based on a defind path.
 */

export default function deepFind(obj = {}, path = '') {
  const paths = path.split('.');
  let current = obj;
  let i;

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    }
    current = current[paths[i]];
  }
  return current;
}
