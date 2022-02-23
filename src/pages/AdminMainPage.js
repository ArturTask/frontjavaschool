import React from "react";
import Pagination from '../modules/Pagination';
import { Navigate } from "react-router-dom";
import Header from "../modules/Header.js"
import Requests from "../HTTP/Requests.js"
import '../css/mainPage.css'
import TableTariffs from "../modules/adminModules/TableTariffs.js"
import TableUsers from "../modules/adminModules/TableUsers.js"
import TableContracts from "../modules/adminModules/TableContracts.js";

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            people:[{name:'a', age:2},{name: 'b', age:9},{name:'c', age:2},{name:'d', age:3},{name:'s',age:9 },{name:"kk",age: 0},{name:"kk",age: 0},{name:"kk",age: 0}],
            totalElems: 0,
            elementsPerPage: 5,
            currentPage: 1,
            option:0,
            info:[],
            currInfo:[],
            head:[],
            optionId:""
        };
        this.paginate = this.paginate.bind(this);
        this.exit = this.exit.bind(this);
        this.chooseOption=this.chooseOption.bind(this);
    }

    componentDidMount(){
        document.getElementById("pagesDiv").style.display="none";
    }


    paginate = (pageNumber) => {
        this.setState({currentPage: pageNumber})
    }

    exit(){
        localStorage.setItem("isAuthorized",0)
    }

    chooseOption(e){ //chose what you want to do now (for admin)
        document.getElementById("pagesDiv").style.display="";
        const optionId = e.target.id;    
        let dataFromServer = [];
        let currentHead=[];

        
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
            currTable = <TableTariffs/>
        }
        else if(this.state.optionId=="adminOptionUsers"){
            currTable = <TableUsers/>
        }
        else if(this.state.optionId=="adminOptionContracts"){
            currTable = <TableContracts/>
        }

        const lastElemIdx = this.state.elementsPerPage*this.state.currentPage;
        const firstElemIdx = lastElemIdx-this.state.elementsPerPage;
        const currPeople = this.state.people.slice(firstElemIdx,lastElemIdx);



        return(
            <div>
                {/* <div className="popUpWindow">
                    here we display some info from table
                </div> */}
                <Header></Header>
                <div id="adminOptions">
                    <a id="adminOptionTariffs" href="#" onClick={this.chooseOption}>Manage tariffs</a>
                    <a id="adminOptionUsers" href="#" onClick={this.chooseOption}>Manage users</a>
                    <a id="adminOptionContracts" href="#" onClick={this.chooseOption}>Manage contracts</a>
                </div>
                <div id="adminDivForTable">
                {currTable}

                {/* <table id="tableTariffs" className="tableCustomers" >
                <thead>
                    <tr>
                        {this.state.head.map(elem=>
                            <th>{elem}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.info.map(
                            tariff =>
                            <tr > 
                                <td >{tariff["id"]}</td>
                                <td >{tariff["title"]}</td>
                                <td >{tariff["description"]}</td>
                            </tr>
                        )
                    }
                    
                </tbody>
            </table>

            <table id="tableUsers" className="tableCustomers" >
                <thead>
                    <tr>
                        {this.state.head.map(elem=>
                            <th>{elem}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.info.map(
                            currentUser =>
                            <tr > 
                                <td >{currentUser["id"]}</td>
                                <td >{currentUser["login"]}</td>
                            </tr>
                        )
                    }
                    
                </tbody>

            </table>

            <table id="tableContracts" className="tableCustomers" >
                <thead>
                    <tr>
                        {this.state.head.map(elem=>
                            <th>{elem}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.info.map(
                            contract =>
                            <tr > 
                                <td >{contract["id"]}</td>
                                <td >{contract["phoneNumber"]}</td>
                                <td >{contract["user"]}</td>
                            </tr>
                        )
                    }
                    
                </tbody>

            </table> */}


            </div>
                <Pagination elementsPerPage={this.state.elementsPerPage} totalElements={this.state.people.length} paginate={this.paginate}/>
            </div>
        );
    }
}

export default MainPage;