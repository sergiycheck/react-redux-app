import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './api/server';
import { worker } from './api/server';
import { extendedApiSlice } from './features/users/usersSlice';

async function main() {
  await worker.start({ onUnhandledRequest: 'bypass' });
  store.dispatch(extendedApiSlice.endpoints.getUsers.initiate());

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

main();
