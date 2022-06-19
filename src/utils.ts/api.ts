/**
 * Forms request data according to given method and other options
 * @param method - could be GET/POST/DELETE and so on
 * @param data - optional
 */
const requestOptions = (method: string, data?: any) => {
  const requestData: any = {
    headers: {},
    method: '',
  };
  requestData.method = method;

  if (data) {
    requestData.headers = {
      ...requestData.headers,
      'Content-Type': `application/json`,
    };
    requestData.body = JSON.stringify(data);
  }

  return requestData;
};

/**
 * Make an AJAX call to backend service
 * @param url
 * @param data
 */
const ajaxCall = async (url: string, data: any) => {
  const response = await fetch(url, data);

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message);
  }

  return new Promise(resolve => {
    if (response) {
      response
        .json()
        .then(json => resolve(json))
        .catch(() => resolve(null));
    } else {
      resolve(null);
    }
  });
};

export { requestOptions, ajaxCall };
