import React from "react";
import { Navigate } from "react-router-dom";
import Logo from "../images/Logo.png"
import '../css/registration.css'
import Requests from "../HTTP/Requests";


class Registration extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        login:"",
        password:""
      }
      this.regMe = this.regMe.bind(this);

    }

    regMe(e){
      e.preventDefault(); //we need to asynchronously get the answer from server
      if(!this.checkLoginAndPassword()){
        return;
      }
      Requests.postUserReg(document.getElementById("loginReg").value, document.getElementById("passwordReg").value,
      ()=>{window.location.href="/"}) //callback to go to our login page
    }


checkLoginAndPassword = ()=>{
  if(this.state.login.length===0){
    document.getElementById("loginExists").innerHTML = "Login is empty";
    document.getElementById("loginExists").className = "fadeIn"; // fade in animation!
    return false;
  }
  if(this.state.password.length===0){
    document.getElementById("loginExists").innerHTML = "Password is empty";
    document.getElementById("loginExists").className = "fadeIn"; // fade in animation!
    return false;
  }
  return true;
}

loginChange = (e) => {
  let currentLogin = e.target.value;
    this.setState({login:currentLogin});
}

passwordChange = (e) => {
  let currentPassword = e.target.value;
    this.setState({password:currentPassword});
}


    render(){
        if (localStorage.getItem('isAuthorized')==1) {
            return (<Navigate to="/mainPage"/>)
          }
          else if (localStorage.getItem('isAuthorized')==2) {
            return (<Navigate to="/mainPage2"/>)
          }

        return(
          <div id="regCentral" className="central fadeInDown">
             
              {/* right side */}
            <div id="formRegistr" className="inline-div">
              <div className="fadeIn first">
                <h2 className="fadeIn first">Register</h2>
              </div>
          
              <form>
                <input onChange={this.loginChange} type="text-a" id="loginReg" className="login fadeIn second" name="login" placeholder="login" required/>
                <input onChange={this.passwordChange} type="password" id="passwordReg" className="password fadeIn third" name="password" placeholder="password" maxLength="10" required></input>
                <div id="loginExists" className="hid">-</div>
                <div>
                  <input type="submit" id="registr" className="logInOrReg fadeIn fourth" value="Register" onClick={this.regMe}/>
                </div>
                  <a className="goToLog fadeIn fourth">Already have an account?</a><a id="notJoin" className="joinOrNot goToLog fadeIn fourth" href="/">Log in</a>
              </form>
    
            </div>

          </div>
        );


    }
}

export default Registration;