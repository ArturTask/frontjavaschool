
// import './App.css';
import './css/common.css';
import { render } from '@testing-library/react';
import React from 'react';
import {Route, Routes, Navigate, Outlet} from 'react-router-dom';
import AuthPage from "./pages/AuthPage.js";
import AdminMainPage from './pages/AdminMainPage.js';
import MainPage2 from './pages/MainPage2.js';
import Registration from './pages/Registration.js';




function App() {
  // var isAuthenticated = localStorage.getItem('isAuthorized');

  return (
    <Routes>
      <Route path="/" element={<AuthPage />}></Route>
      <Route path="/registr" element={<Registration/>}></Route>
      {/* <Route element={<AuthenticatedRoute/>}> */}
        <Route path='/adminMainPage' element={<AdminMainPage/>}/>
        <Route path='/mainPage2' element={<MainPage2/>}/>
      {/* </Route> */}
    </Routes>
  );
}

// function AuthenticatedRoute(){ // cant move to authorization if authorized
//   if(localStorage.getItem("isAuthorized")==0){
//     return(<Navigate to="/"></Navigate>)
//   }
//   else if(localStorage.getItem("isAuthorized")==1){
//     return(<Navigate to="/mainPage"/>)
//   } 
// }

export default App;
