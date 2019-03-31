import axios from 'axios';

const httpModule = axios.create({
  headers: {
    Accept: 'application/json',
  },
});

export default httpModule;
