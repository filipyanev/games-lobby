import {
  baseURL,
  operatorToken,
  playerPath,
  playerToken,
} from '../../constants/api';
import { ajaxCall, requestOptions } from '../../utils.ts/api';

const basePlayerPath = `${baseURL}/${playerPath}`;

// eslint-disable-next-line import/prefer-default-export
export const getPlayerData = () =>
  new Promise((res, rej) => {
    const url = `${basePlayerPath}?playerToken=${playerToken}&operatorToken=${operatorToken}`;

    ajaxCall(url, requestOptions('GET')).then(res).catch(rej);
  });
