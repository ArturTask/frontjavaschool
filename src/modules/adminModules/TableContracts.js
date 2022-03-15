import react from "react";
import Requests from "../../HTTP/Requests.js";
import Pagination from '../Pagination.js';
import $ from 'jquery'
import ModalUser from "./ModalUser.js";

class tableContracts extends react.Component{
    constructor(props){
        super(props)
        this.state={
            head:[" ","Phone number","User"],
            info:[{id:1,phoneNumber:234,user:"vasya"},{id:1,phoneNumber:234,user:"vasya"},{id:1,phoneNumber:234,user:"vasya"},{id:1,phoneNumber:234,user:"vasya"},{id:1,phoneNumber:234,user:"vasya"},{id:1,phoneNumber:234,user:"vasya"},{id:1,phoneNumber:234,user:"vasya"}],
            totalElements: 6,
            elementsPerPage: 5,
            currentPage: 1,
            showModalWindow:false,
            body:"",
            currentPhoneNumber: ""

        }
        this.paginate = this.paginate.bind(this);
        this.findUserByPhoneNumber = this.findUserByPhoneNumber.bind(this);
        this.changePhoneNumber = this.changePhoneNumber.bind(this);
    }

    componentDidMount(){
        Requests.getAllContractsUserInfo().then((response)=>{
            this.setState({info:response.data, totalElements:response.data.length})
        })
    }

    paginate = (pageNumber) => {
        this.setState({currentPage: pageNumber})
    }

    findUserByPhoneNumber(e){
        e.preventDefault();
        if(/[8]{1}[7]{3}[0-9]{7}$/.test($("#usersPhoneNumberInput").val())){
            Requests.getFindUserByPhoneNumber($("#usersPhoneNumberInput").val().slice(0,11)).then((response)=>{
                if(response.data.id==null){
                    alert("user not found")
                }
                else{
                    this.props.display(response.data.id,response.data.login);
                }
            })
        }
        else{
            alert("incorrect phone number should be 8777******* \n* - any num")
        }
    }


    changePhoneNumber(e){
        if(e.target.value.slice(0,4)!=="8777"){
            this.setState({currentPhoneNumber: "8777"})
        }
        else if(e.target.value.length<=11){
            this.setState({currentPhoneNumber: e.target.value})
        }
    }


    render(){

        const lastElemIdx = this.state.elementsPerPage*this.state.currentPage;
        const firstElemIdx = lastElemIdx-this.state.elementsPerPage;
        const currInfo = this.state.info.slice(firstElemIdx,lastElemIdx);


        return(
            <div>
                <div className="tableHeaderDiv">Contracts</div>
                <form>
                    <div className="inline searchField">
                        <input className="searchFieldInput" type="tel" id="usersPhoneNumberInput" name="phone" placeholder="search user by phone number" pattern="[8]{1}[7]{3}[0-9]{7}$" required value={this.state.currentPhoneNumber} onChange={this.changePhoneNumber} onFocus={this.changePhoneNumber}></input>
                        <button onClick={this.findUserByPhoneNumber}>find</button>
                    </div>
                </form>
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
                            currInfo.map(
                                contract =>
                                <tr > 
                                    <td ></td> {/*contract["contractId"]*/}
                                    <td >{contract["phoneNumber"]}</td>
                                    <td >{contract["userName"]}</td>
                                </tr>
                            )
                        }
                        
                    </tbody>
                </table>
                <Pagination elementsPerPage={this.state.elementsPerPage} totalElements={this.state.totalElements} paginate={this.paginate}/>
            </div>
        );
    }
}

export default tableContracts;