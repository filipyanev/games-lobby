import { baseURL, operatorToken, gamesPath } from '../../constants/api';
import { ajaxCall, requestOptions } from '../../utils.ts/api';

const basePlayerPath = `${baseURL}/${gamesPath}`;

// eslint-disable-next-line import/prefer-default-export
export const getGamesData = (
  currency: string,
  type: 'any' | 'slots' | 'live',
) =>
  new Promise((res, rej) => {
    const url = `${basePlayerPath}?operatorToken=${operatorToken}&currency=${currency}&type=${type}`;

    ajaxCall(url, requestOptions('GET')).then(res).catch(rej);
  });
