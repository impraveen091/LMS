import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASEURL} from './axios';
import {ToastAndroid} from 'react-native';

async function customRequest(path, method = 'POST', body) {
  const token = await AsyncStorage.getItem('tokenStudent');

  let headers = {
    'Content-Type': 'application/json',
    accept: 'application/json',
  };

  if (token !== null) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(`${BASEURL}/${path}`, {
    method: method,
    body: JSON.stringify(body),
    headers: headers,
  })
    .then(res => {
      console.log('respoJson***', res);
      if (res.status == 210) {
        return 'Data Not Found';
      }
      return res.json();
    })

    .catch(err => {
      console.log('error', err.response);
      if (err.response && err.response.status === 403) {
        alert('Oops! Some of the data is missing.');
      }
      if (err.response && err.response.status === 210) {
        return 'no data found';
      }
    });
}

async function customRequestMultipart(route, body) {
  return fetch(`${BASEURL}/${route}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(err => {
      alert('Oops! Something went wrong.');
    });
}

export {customRequest, customRequestMultipart};
