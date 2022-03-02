import React from "react";
import Pagination from '../modules/Pagination';
import { Navigate } from "react-router-dom";
import Header from "../modules/Header.js"
import Requests from "../HTTP/Requests.js"
import '../css/mainPage.css'
import TableTariffs from "../modules/adminModules/TableTariffs.js"
import TableUsers from "../modules/adminModules/TableUsers.js"
import TableContracts from "../modules/adminModules/TableContracts.js";
import ModalWindow from "../modules/ModalWindow";
import ModalTariff from "../modules/adminModules/ModalTariff";
import $ from "jquery";
import ModalUser from "../modules/adminModules/ModalUser";
import ModalEditTariff from "../modules/adminModules/ModalEditTariff";

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            optionId:"",
            showModalWindow:false,
            body:""
        };
        // this.paginate = this.paginate.bind(this);
        this.exit = this.exit.bind(this);
        this.chooseOption=this.chooseOption.bind(this);
        this.onClose = this.onClose.bind(this);
        this.refresh = this.refresh.bind(this);
        this.displayAddTariff = this.displayAddTariff.bind(this);
        this.displayUserEdit = this.displayUserEdit.bind(this);
        this.displayEditTariff = this.displayEditTariff.bind(this);
    }

    exit(){
        localStorage.setItem("isAuthorized",0)
    }

    chooseOption(e){ //chose what you want to do now (for admin)
        // document.getElementById("pagesDiv").style.display="";
        const optionId = e.target.id;    

        
        if(optionId=="adminOptionTariffs"){
            this.setState({optionId:"adminOptionTariffs"})

        }
        else if(optionId=="adminOptionUsers"){
            this.setState({optionId:"adminOptionUsers"})
            
        }
        else if(optionId=="adminOptionContracts"){
            this.setState({optionId:"adminOptionContracts"})
        }
    }

    onClose(){ 
        this.setState({showModalWindow:false})
        // window.location.reload();
    }

    refresh(){
        this.setState({showModalWindow:false})
        window.location.reload();
    }

    displayAddTariff(){ 
        this.setState({showModalWindow:true})
        this.setState({body: <ModalTariff refresh={this.refresh}/>})
    }

    displayEditTariff(tariffId,tariffTitle,tariffDescription){ 
        this.setState({showModalWindow:true})
        this.setState({body: <ModalEditTariff refresh={this.refresh} tariffId={tariffId} title={tariffTitle} description={tariffDescription}/>})
    }

    displayUserEdit(userId,userName){ 
        this.setState({showModalWindow:true});
        this.setState({body:<ModalUser refresh={this.refresh} userId={userId} userName={userName}/>})
    }

    render(){
        let currTable;

        //navigation according to role
        if(localStorage.getItem("isAuthorized")==0){
            return(<Navigate to="/"></Navigate>)
        }
        if(localStorage.getItem("isAuthorized")==2){
            return(<Navigate to="/customerMainPage"></Navigate>)
        }
        
        //choose the table you want to see
        if(this.state.optionId=="adminOptionTariffs"){
            currTable = <TableTariffs display={this.displayAddTariff} displayEdit={this.displayEditTariff}/>
        }
        else if(this.state.optionId=="adminOptionUsers"){
            currTable = <TableUsers display={this.displayUserEdit}/>
        }
        else if(this.state.optionId=="adminOptionContracts"){
            currTable = <TableContracts/>
        }

        return(
            <div>
                <Header></Header>
                <div id="adminOptions">
                    <a id="adminOptionTariffs" href="#" onClick={this.chooseOption}>Manage tariffs</a>
                    <a id="adminOptionUsers" href="#" onClick={this.chooseOption}>Manage users</a>
                    <a id="adminOptionContracts" href="#" onClick={this.chooseOption}>Manage contracts</a>
                </div>
                {(this.state.showModalWindow) ? <ModalWindow onClose={this.onClose} body={this.state.body} />:<div></div>}
                <div id="adminDivForTable">
                    {currTable}
                    <div id="lol"></div>

                </div>
            </div>
        );
    }
}

export default MainPage;