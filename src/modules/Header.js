import React from "react";
import '../css/header.css'

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:"sss"
        };
    }
    exit(){
        localStorage.setItem("isAuthorized",0)
    }


    render(){
        return(
            <div>
                <nav className="top-menu">
                <ul class="menu-main">
                    <li id = 'personalAcc'><a href="/account" className="current">{this.state.name}</a></li>
                    <li id = 'main'><a href="/adminMainPage">Главная страница</a></li>
                    <li id = 'exit'><a href="/" onClick={this.exit}>Выход</a></li>
                </ul>
             </nav> 
            </div>
        );
    }
}

export default Header;