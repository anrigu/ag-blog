import axios from 'axios';

export default axios.create({
  baseURL: '',
  // baseURL: `${process.env.REACT_APP_REST_API_URL}`,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'x-csrftoken',
  validateStatus: () => true
});