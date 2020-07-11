fetch = require('node-fetch');

const getRequest = (query, variables) => {
  const url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  return { url, options };
};

const makeRequest = (query, variables) => {
  const request = getRequest(query, variables);
  url = request.url;
  options = request.options;
  return fetch(url, options).then(handleResponse).then(handleData).catch(handleError);
};

// Make the HTTP Api request

function handleResponse(response) {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleData(data) {
  console.log(data);
  data.data.Media.description = data.data.Media.description.replace(/<br><br>/g, '');
  return data;
}

function handleError(error) {
  // alert('Error, check console');
  console.error(error);
}

module.exports = { makeRequest };
