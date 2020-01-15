import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import Sidebar from './SideBar';
import Header from './Header';
import Routes from '../Routes';
import { ToastContainer } from 'react-toastify';
import { isLoggedIn } from '../services/auth';

function App() {
  return (
    <>
      <div className="wrapper">
        <BrowserRouter>
          <Sidebar visible={isLoggedIn()} />
          <div id="content">
            <Header visible={isLoggedIn()} />
            <Routes />
          </div>
        </BrowserRouter>
      </div>
      <ToastContainer 
        autoClose={3000}
        draggable={false}
        pauseOnFocusLoss={false}
       />
    </>
  );
}

export default App;
