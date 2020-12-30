import _ from 'lodash';
import themes from './themes';

export const objectReplace = (objects, newObj, key) => {
  return objects.map((obj) => (obj[key] === newObj[key] ? newObj : obj));
};

export const colorHandler = (index) => {
  let color;
  switch (index) {
    case 0:
      color = themes.GOLD;
      break;
    case 1:
      color = themes.SILVER;
      break;
    case 2:
      color = themes.BRONZE;
      break;

    default:
      color = themes.REMAINING;
      break;
  }
  return color;
};
