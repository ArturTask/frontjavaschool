import react from "react";
import Requests from "../../HTTP/Requests";
import $ from "jquery"
import UsersModalContract from "../userModules/UsersModalContract";
import UsersModalTariff from "../userModules/UsersModalTariff";

export default class ModalUser extends react.Component{
    constructor(props){
        super(props)
        this.state={
            status:"",
            info:[],
            showChangeContractModalWindow:false,
            showSignModalWindow:false,
            body:""
        }
        this.editUser = this.editUser.bind(this);
        this.changeBlockUser = this.changeBlockUser.bind(this);
        this.showContract = this.showContract.bind(this);
        this.displayPossibleTariffs = this.displayPossibleTariffs.bind(this);
        this.displayUsersTariff = this.displayUsersTariff.bind(this);
    }

    componentDidMount(){
        Requests.getContractIdsANdPhoneNumbersOfUser(this.props.userId).then((response)=>{
            // alert(response.data[0].phoneNumber);
            this.setState({info:response.data});
    
            Requests.getIsBlocked(this.props.userId).then((response)=>{
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

    editUser(){
        this.props.refresh();
    }

    showContract(){ //to change existing contract

        if(this.state.info.length>0){ //if user has contracts

            this.setState({ // set body to div so that UsersModalContract ComponentDidMount works (wothout it it wont work)
                showChangeContractModalWindow:true,
                body:<div></div>,
                showSignModalWindow:false
            })

            setTimeout(() => {
                this.setState({
                    showChangeContractModalWindow:true,
                    body:<UsersModalContract phoneNumber={$(".contractSelect").find(":selected").text()} contractId={$(".contractSelect").find(":selected").val()} customerId={this.props.userId}/>,
                    showSignModalWindow:false
                })    
            }, 500);
            
        }
    }

    displayPossibleTariffs(){ // to show select of tariffs
        let serverData = [];
        Requests.getAllActiveTariffs().then((response)=>{
            response.data.map(tariff=>{
                let currTariff = {
                    id:tariff.id,
                    title:tariff.title
                }
                serverData.push(currTariff)
            });
            this.setState({tariffs: serverData,oldContractId:this.props.oldContractId});
            this.setState({
                showSignModalWindow:true,
                body:
                <div>
                    <select className="tariffToChoose" onChange={this.displayUsersTariff}>
                            <option disabled value="">tariff</option>
                            {
                                this.state.tariffs.map((tariff)=>{
                                    return(
                                        <option value={tariff.id}>{tariff.title}</option>
                                );
                                })
                            }
                    </select>
                    <button onClick={this.displayUsersTariff} className="makeContractWithCustomer" >Choose this tariff</button>
                </div>
                ,
                showChangeContractModalWindow:false
            })
        });// end of "then"
    }

    displayUsersTariff(){ // to sign new contract
        let tariffId = $(".tariffToChoose").find(":selected").val()
        if(tariffId!==""){
        this.setState({
                showSignModalWindow:true,
                body: <UsersModalTariff refresh={this.refresh} tariffId={tariffId} customerId={this.props.userId}/>,
                showChangeContractModalWindow:false
            })
        }
    }

    changeBlockUser(){
        Requests.changeBlockUserByAdmin(this.props.userId).then((response)=>{
            alert(response.data.message);
            window.location.reload();
        });
    }

    render(){
        return(
        <div>
            <div id="modalUserBody" className="modalBody">
                <div id="modalUserInfo">
                    <h1>User: {this.props.userName}</h1><h4>(Id: {this.props.userId})</h4>
                    
                    <div className="beforeBlock">status: </div>
                    <input className="isBlocked" type="text" value={this.state.status}></input>
                    <button onClick={this.changeBlockUser} className="changeBlock">Change user status</button>
                    
                    <select className="contractSelect" onChange={this.showContract}>
                        {   
                        this.state.info.map((idAndNumber)=>{
                                return(
                                <option value={idAndNumber.contractId}>{idAndNumber.phoneNumber}</option>
                                );
                            }

                        )
                        }
                    </select>
                    <button className="makeContractWithCustomer" onClick={this.showContract}>Show existing contract</button>
                    <button className="makeContractWithCustomer" onClick={this.displayPossibleTariffs}>Make new contract with user</button>
                    
                    {/* {(this.state.showChangeContractModalWindow||this.state.showSignModalWindow)?this.state.changeContractBody:<div></div>}     */}
                    {this.state.showChangeContractModalWindow?this.state.body:<div></div>}
                    {this.state.showSignModalWindow?this.state.body:<div></div>}
                </div>
            </div>
        </div>
        );
    }



}