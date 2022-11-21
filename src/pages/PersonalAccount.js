import react from "react";
import Header from "../modules/Header";
import logo from "../images/accountLogo.png"
import '../css/personalAccount.css'
import Requests from "../HTTP/Requests";
import ModalWindow from "../modules/ModalWindow";
import UsersModalContract from "../modules/userModules/UsersModalContract";
import $ from "jquery";
import { Navigate } from "react-router-dom";

class PersonalAccount extends react.Component{
    constructor(props){
        super(props);

        this.state={
            info:[],
            showModalWindow:false,
            body:"",
            status:"",
            contractInfo:""
        }
        this.onClose = this.onClose.bind(this);
        this.refresh = this.refresh.bind(this);
        this.showContract = this.showContract.bind(this);
        this.changeBlockUser = this.changeBlockUser.bind(this);
    }

    componentDidMount(){
        if(localStorage.getItem("userRole")=="Admin"){
            // document.getElementById("contract").innerHTML="Admins rules";
            this.setState({contractInfo:"Admins rules"})
        }
        else{
            //get contract from Requests by get
            Requests.getContractIdsANdPhoneNumbersOfUser(localStorage.getItem("userId")).then((response)=>{
                // alert(response.data[0].phoneNumber);
                this.setState({info:response.data});
                Requests.getIsBlocked(localStorage.getItem("userId")).then((response)=>{
                    let isBlockedDto = response.data;
                    if(isBlockedDto.message==null){
                        if(isBlockedDto.blocked){
                            this.setState({status:"Blocked"})
                            $(".isBlocked").addClass("blocked");
                        }
                        else{
                            this.setState({status:"Active"})
                            $(".isBlocked").addClass("unblocked");
                        }
                    }
                    else{
                        alert(isBlockedDto.message)
                    }
                });

            });

            
        }

    }

    onClose(){
        this.setState({showModalWindow:false})
    }

    refresh(){
        this.setState({showModalWindow:false})
        window.location.reload();
    }

    showContract(){
        if($(".contractSelect option").length>0){
            this.setState(
                {showModalWindow:true,
                    body:<UsersModalContract phoneNumber={$(".contractSelect").find(":selected").text()} contractId={$(".contractSelect").find(":selected").val()}/>
                })
        }
        else{
            alert("no available contracts")
        }
    }

    changeBlockUser(){
        Requests.changeBlockUser(localStorage.getItem("userId")).then((response)=>{
            alert(response.data.message);
            window.location.reload();
        });
    }

    render(){
        if(localStorage.getItem("isAuthorized")==0){
            return(<Navigate to="/"></Navigate>);
        }
        
        return(
        <div className="bodyPersonalAccount">
            { (this.state.showModalWindow)?<ModalWindow onClose={this.onClose} body={this.state.body} />:<div></div>}
            <Header></Header>
            <div className="pageHeaderName">Personal Account</div>
            <div id="personalAccountBody">
                <div id="personalInfo">
                    <img src={logo}/>
                    <div className="beforeBlock">status: </div>
                    <input className="isBlocked" type="text" value={this.state.status}></input>
                    <div id="userName" className="userInfo">Your username: {localStorage.getItem("userName")}</div>
                    <div id="userRole" className="userInfo">Your role: {localStorage.getItem("userRole")}</div>
                    <div id="contract" className="userInfo">{this.state.contractInfo}</div>
                    <select className="contractSelect">
                        {   
                        this.state.info.map((idAndNumber)=>{
                                return(
                                <option value={idAndNumber.contractId}>{idAndNumber.phoneNumber}</option>
                                );
                            }

                        )
                        }
                    </select>
                    <button onClick={this.showContract}>show contract</button>
                    <button onClick={this.changeBlockUser} className="changeBlock">change blocked status</button>
                </div>
            </div>
        </div>
        );
    }

}

export default PersonalAccount;