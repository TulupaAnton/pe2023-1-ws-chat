import axios from 'axios';
import { io } from 'socket.io-client';

const axiosOptions = {
  baseURL: 'http://127.0.0.1:5000/api',
};

const apiInstance = axios.create(axiosOptions);

export const getMessages = limit => apiInstance.get(`/messages?limit=${limit}`);

// export const createMessage = newMessage =>
//   apiInstance.post('/messages', newMessage);

const socket = io('ws://localhost:5000');

export const createMessage = payload => {
  console.log('payload :>> ', payload);
  socket.emit('NEW_MESSAGE', payload);
};
