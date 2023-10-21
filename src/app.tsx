import './styles/app.css';

import React from 'react';

import { Provider } from 'react-redux';
import store from './redux/store';
import Map from './components/map/map';
import Menu from './components/menu/menu';

function App() {
  return (
    <Provider store={store}>
        <div>
            <Map />
            <Menu />
        </div>
    </Provider>
  );
}

export default App;