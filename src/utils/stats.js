import {USER_STATUS} from '../const';

const getStatus = (number) => {
  const status = [];
  for (const key in USER_STATUS) {
    if (USER_STATUS[key].FROM <= number && number <= USER_STATUS[key].TO) {
      status.push(key);
    }
  }

  return status;
};

export { getStatus };
