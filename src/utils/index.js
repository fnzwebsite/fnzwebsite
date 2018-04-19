import React        from 'react';
import fetch        from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import { getConfig,authHeader } from '../helpers/index';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function buildHeaders() {
  const authToken = localStorage.getItem('token');

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

  return fetch(url, {
    method: 'post',
    headers: buildHeaders(),
    body: body,
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