import axios from 'axios';
const BASEURL = 'https://lmscode.chahalacademy.com/api';
export default axios.create({
  baseURL: BASEURL,
});

export {BASEURL};
