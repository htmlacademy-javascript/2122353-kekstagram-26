import { config } from './config.js';

const getDataFromApi = async () =>  {
  const response = await fetch(config.getData.url, {
    method: 'GET',
    headers: config.getData.headers,
    cors: 'no-cors'
  });

  if (response.status === 200) {
    return response.json();
  }

  const error = new Error('Something went wrong');
  error.data = await response.json();
  throw error;
};

const sendFormDataToApi = (formData, onSuccess, onError) => {
  fetch(
    config.sendData.url,
    {
      method: 'POST',
      body: formData,
      cors: 'no-cors',
    },
  ).then((response) => onSuccess(response))
    .catch(() => onError());
};

export { getDataFromApi, sendFormDataToApi };
