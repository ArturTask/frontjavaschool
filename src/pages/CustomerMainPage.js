import React from "react";
import Pagination from '../modules/Pagination';
import { Navigate } from "react-router-dom";
import '../css/mainPage.css'
import Header from "../modules/Header";
import Requests from "../HTTP/Requests";
import UsersModalTariff from "../modules/userModules/UsersModalTariff.js"
import ModalWindow from "../modules/ModalWindow";
import UsersTableTariff from "../modules/userModules/UsersTableTariff.js";

class CustomerMainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            smth:"",
            showModalWindow:false,
            body:""
        };
        this.onClose = this.onClose.bind(this);
        this.refresh = this.refresh.bind(this);
        this.displayUsersTariff = this.displayUsersTariff.bind(this);
    }

    onClose(){
        this.setState({showModalWindow:false})
    }

    refresh(){
        this.setState({showModalWindow:false})
        window.location.reload();
    }

    displayUsersTariff(tariffId,tariffTitle,tariffDescription){ 
        this.setState({showModalWindow:true})
        this.setState({body: <UsersModalTariff refresh={this.refresh} tariffId={tariffId} title={tariffTitle} description={tariffDescription} />})
    }

    render(){
        if(localStorage.getItem("isAuthorized")==0){
            return(<Navigate to="/"></Navigate>)
          }
        if(localStorage.getItem("isAuthorized")==1){
            return(<Navigate to="/adminMainPage"></Navigate>)
          }

        return(
            <div>
                <Header></Header>
                {(this.state.showModalWindow) ? <ModalWindow onClose={this.onClose} body={this.state.body} />:<div></div>}
                <UsersTableTariff display={this.displayUsersTariff}/>
                
                
                
            </div>
        );
    }
}

export default CustomerMainPage;