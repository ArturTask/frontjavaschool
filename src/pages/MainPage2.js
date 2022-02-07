import React from "react";
import Pagination from '../modules/Pagination';
import { Navigate } from "react-router-dom";
import '../css/mainPage.css'
import Header from "../modules/Header";

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            people:[{name:'a', age:2},{name: 'b', age:9},{name:'c', age:2},{name:'d', age:3},{name:'s',age:9 },{name:"kk",age: 0},{name:"kk",age: 0},{name:"kk",age: 0}],
            totalElems: 0,
            elementsPerPage: 5,
            currentPage: 1
        };
        this.paginate = this.paginate.bind(this);
        this.exit = this.exit.bind(this);
    }

    exit(){
        localStorage.setItem("isAuthorized",0)
        
        // alert(localStorage.getItem("isAuthorized"))
    }

    paginate = (pageNumber) => {
        this.setState({currentPage: pageNumber})
    }

    render(){
        if(localStorage.getItem("isAuthorized")==0){
            return(<Navigate to="/"></Navigate>)
          }
        if(localStorage.getItem("isAuthorized")==1){
            return(<Navigate to="/adminMainPage"></Navigate>)
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
                <a href="/" id="exit" onClick={this.exit}>exit</a>
                <table className="tablePeople" >
                <tr>
                    <th>Name</th>
                    <th>age</th>
                </tr>
                <tbody>
                    {
                        currPeople.map(
                            human =>
                            <tr > 
                                <td >{human.name}</td>
                                <td >{human.age}</td>         
                            </tr>
                        )
                    }
                    
                </tbody>

            </table>
                <Pagination elementsPerPage={this.state.elementsPerPage} totalElements={this.state.people.length} paginate={this.paginate}/>
            </div>
        );
    }
}

export default MainPage;