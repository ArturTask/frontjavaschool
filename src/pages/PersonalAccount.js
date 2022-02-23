import react from "react";
import Header from "../modules/Header";
import logo from "../images/accountLogo.png"
import '../css/personalAccount.css'

class PersonalAccount extends react.Component{

    componentDidMount(){
        if(localStorage.getItem("userRole")=="Admin"){
            document.getElementById("contract").innerHTML="Admins rules";
        }
        else{
            //get contract from Requests by get
        }
    }

    render(){
        
        return(
        <div>
            <Header></Header>
            <div id="personalAccountBody">
                <div id="personalInfo">
                    <img src={logo}/>
                    <div id="userName" className="userInfo">Your username: {localStorage.getItem("userName")}</div>
                    <div id="userRole" className="userInfo">Your role: {localStorage.getItem("userRole")}</div>
                    <div id="contract" className="userInfo">No active contracts</div>
                </div>
            </div>
        </div>
        );
    }

}

export default PersonalAccount;