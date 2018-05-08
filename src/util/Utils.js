import React        from 'react';
import fetch        from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import { getConfig} from 'helpers/ConfigSettings';
import { authHeader} from 'components/Common/function/AuthHeader';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function buildHeaders() {
  const authToken = JSON.parse(localStorage.getItem('token'));

  return { ...defaultHeaders, Authorization: authToken };
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {

    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {
  //alert(JSON.stringify(response));
  return response.json();
}

export function checkData(response) {
    if (response.status == 400) {
        var error = new Error(response.status);
        error.response = response;
        error.message = "Token Expired or Token not valid.";
        throw error;
    }
    else {
      return response
    }
}

export function httpGet(url) {

  return fetch(getConfig('socketurl')+url, {
      mode:'cors',
      headers:authHeader()
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(checkData);
}

export function httpPost(url, data) {
  const body = JSON.stringify(data);
  //alert(JSON.stringify(buildHeaders()));
  //console.log(JSON.stringify(buildHeaders()));
  return fetch(url, {
    method: 'post',
    headers: buildHeaders(),
    body: body,
    mode:'cors'
  })
  .then(checkStatus)
  .then(parseJSON);
}

export function httpServerPost(url, data) {
    const body = JSON.stringify(data);
//console.log(JSON.stringify(buildHeaders()));
    return fetch(getConfig('socketurl')+url, {
        method: 'post',
        headers: buildHeaders(),
        body: body,
        mode:'cors'
    })
        .then(checkStatus)
        .then(parseJSON);
}

export function httpNodeServerPost(url, data) {
  const body = JSON.stringify(data);
//alert(getConfig('socketurl')+url);
  return fetch(getConfig('socketurl')+url, {
    method: 'post',
    headers: buildHeaders(),
    body: body,
    mode:'cors'
  })
  .then(checkStatus)
  .then(parseJSON);
}

export function httpDelete(url) {

  return fetch(url, {
    method: 'delete',
    headers: buildHeaders(),
  })
  .then(checkStatus)
  .then(parseJSON);
}

export function setDocumentTitle(title) {
  document.title = `${title} | FNZ`;
}

export function renderErrorsFor(errors, ref) {
  if (!errors) return false;
  if (typeof errors == "string") {
    return (
      <div className="error">
        {errors}
      </div>
    );
  } else {
    return errors.map((error, i) => {
      if (error[ref]) {
        return (
          <div key={i} className="error">
            {error[ref]}
          </div>
        );
      }
    });
  }
}
