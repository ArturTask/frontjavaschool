
// import './App.css';
import './css/common.css';
import { render } from '@testing-library/react';
import React from 'react';
import {Route, Routes, Navigate, Outlet} from 'react-router-dom';
import AuthPage from "./pages/AuthPage.js";
import AdminMainPage from './pages/AdminMainPage.js';
import CustomerMainPage from './pages/CustomerMainPage.js';
import Registration from './pages/Registration.js';
import PersonalAccount from './pages/PersonalAccount';
import { ToastProvider } from 'react-toast-notifications';




function App() {
  // var isAuthenticated = localStorage.getItem('isAuthorized');

  return (
    <Routes>
      <Route path="/" element={
      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        placement="top-right"
      >
      <AuthPage />
      </ToastProvider>}>
      </Route>
      <Route path="/registr" element={<Registration/>}></Route>
      {/* <Route element={<AuthenticatedRoute/>}> */}
        <Route path='/adminMainPage' element={<AdminMainPage/>}/>
        <Route path='/customerMainPage' element={<CustomerMainPage/>}/>
        <Route path='/personalAccount' element={<PersonalAccount/>}/>
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
