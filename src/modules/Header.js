import React from "react";
import '../css/header.css'

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:localStorage.getItem("userName")
        };
    }
    exit(){
        localStorage.setItem("isAuthorized",0)
    }


    render(){
        return(
            <div>
                <div className="top-menu">
                </div>
                <div class="menu-main">
                    <a id="personalAccount" href="/personalAccount">Personal account</a>
                    {/* <div id = 'userName' className="current">{this.state.name}</div> */}
                    <a id="mainPage" href="/customerMainPage">Main Page</a>
                    <a id = 'exit' href="/" onClick={this.exit}>Exit</a>
                </div>
             </div> 
        );
    }
}

export default Header;