import React from "react";
import { Navigate } from "react-router-dom";
import Requests from "../HTTP/Requests";
import "../css/authPage.css"
import Logo from "../images/Logo.png"
// import MainPage from "./MainPage";

class AuthPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            smth: "",
            id: "",
            role: "",
            login: "",
            password: ""
        };
        this.logMe = this.logMe.bind(this);
    }

// componentDidMount(){
//     Requests.getData().then((response)=>{
//         this.setState({smth: response.data});
//     }
//     );
// }

logMe(e){
    e.preventDefault(); //we need to asynchronously get the answer from server
    localStorage.setItem("userName",document.getElementById("login").value);
    if(!this.checkLoginAndPassword()){
      return;
    }
    Requests.postUserLogIn(document.getElementById("login").value,document.getElementById("password").value,
    ()=>{window.location.reload();} //callback function reload to reload after we get our data
    );
}

checkLoginAndPassword = ()=>{
  if(this.state.login.length===0){
    document.getElementById("wrongLogin").innerHTML = "Login is empty";
    document.getElementById("wrongLogin").className = "fadeIn"; // fade in animation!
    return false;
  }
  if(this.state.password.length===0){
    document.getElementById("wrongLogin").innerHTML = "Password is empty";
    document.getElementById("wrongLogin").className = "fadeIn"; // fade in animation!
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

    // render(){
        

    //     return(
    //         <div>
    //           lol
    //           <h1>{this.state.smth}</h1>
    //         </div>
    //     );
    // }

    render(){

        if (localStorage.getItem('isAuthorized')==1) {
          return (<Navigate to="/adminMainPage"/>)
        }
        else if (localStorage.getItem('isAuthorized')==2) {
            return (<Navigate to="/customerMainPage"/>)
          }
          

 
    return(
        <div className="central fadeInDown">
            {/* left side */}
           <div id="ad" className="inline-div">
               <h1 className="fadeIn first">JOIN THE BEST mobile operator IN THE WORLD</h1>

               {/* <div>{this.state.smth}</div> */}

               <h2 className="fadeIn second">Explore universe with us</h2>
           </div>

            {/* right side */}
          <div id="formLog" className="inline-div">
            <div className="fadeIn first">
              <h2>Log In</h2>
            </div>
        
            <form>
              <input type="text-a" id="login" onChange={this.loginChange} className="login fadeIn second" name="login" placeholder="login" required/>
              <input type="password" id="password" onChange={this.passwordChange} className="password fadeIn third" name="password" placeholder="password" maxLength="10" required></input>
              <div id="wrongLogin" className="hid">-</div>
              <div>
                <input type="submit" id="logIn" className="logInOrReg fadeIn fourth" value="Login" onClick={this.logMe}/>
              </div>
                <a className="goToRegistr fadeIn fourth">Don't have an account?</a><a id="join" className="joinOrNot goToRegistr fadeIn fourth" href="/registr">Join</a>
            </form>
  
          </div>

        </div>
      );
}

}


export default AuthPage;