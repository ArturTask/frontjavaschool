import react from "react";
import Requests from "../../HTTP/Requests";
import $ from "jquery";
import ChangeTariffModal from "../ChangeTariffModal";


export default class UsersModalContract extends react.Component{
    constructor(props){
        super(props)
        this.state={
            contract:{},
            options:[],
            tariff:{},
            contractOptions:[],
            showWarning:false,
            showChangeContract:false,

            
        }
        this.changeContract = this.changeContract.bind(this);
        this.yesAnswer = this.yesAnswer.bind(this);
        this.noAnswer = this.noAnswer.bind(this);
        this.onCloseChangeContract = this.onCloseChangeContract.bind(this);
        
    }

    componentDidMount(){
        Requests.postGetContract(this.props.contractId,this.props.phoneNumber).then((response)=>{
            this.setState({
                contract:response.data,
                tariff:response.data.tariffDto,
                contractOptions:response.data.contractOptions
            })
            
        })

    }

    //main Function
    changeContract(e){
        e.preventDefault()
        this.setState({showWarning:true});
        
    }

    yesAnswer(e){
        e.preventDefault()
        this.setState({showWarning:false,showChangeContract:true});
    }

    noAnswer(e){
        e.preventDefault()
        this.setState({showWarning:false});
    }

    onCloseChangeContract(){
        this.setState({showChangeContract:false});
    }

    render(){
        return(
        <div>
            {
                (this.state.showChangeContract)?<ChangeTariffModal oldContractId={this.props.contractId} oldPhoneNumber={this.props.phoneNumber} onClose={this.onCloseChangeContract} customerId={this.props.customerId}/>:<div></div>
            }

            {
                (this.state.showWarning)?<div id="modalWarningChangeContract">
                <input id="warningText" value="WARNING"></input>
                <textarea value="Are you sure? If you change tariff/options you will lose your old ones and tariff and only be able to choose NEW options of NEW tariff" cols="18" rows="4"></textarea>
                <button onClick={this.yesAnswer} className="inlineButton" id="yesButton">Yes</button>
                <button onClick={this.noAnswer} className="inlineButton" id="noButton">No</button>
                </div>:
                <div></div>
            }

            <div id="modalUsersTariffBody" className="modalBody">
                <div id="modalUsersTariffInfo">
                    <form>
                        <h3>Contract for: {this.props.phoneNumber}</h3>
                        <h4>Tariff id {this.state.tariff.id} info:</h4>
                        <h4>Title:</h4>
                        <input id="contractTariffUsersTitle" className="inputModal" type="text" required="true" placeholder="Title" value={this.state.tariff.title}></input>
                        <h4>Description:</h4>
                        <textarea id="tariffUsersDescription" className="inputModal" type="text" required="true" placeholder="Description" cols="18" rows="4" value={this.state.tariff.description}></textarea>
                        <h4>Cost in $:</h4>
                        <input id="tariffUsersCost" className="inputModal" type="text" required="true" placeholder="Cost in $" value={this.state.tariff.cost}></input>
                        <h4>Options:</h4>
                        <div id="userOptions">
                            <input className="beforeOptions" type="text" value="Name"></input>
                            <input className="beforeOptions" type="text" value="Cost in $"></input>
                            <input className="beforeOptions" type="text" value="Type"></input>
                            
                            <input className="betweenOptionTypes" type="text" value="Chosen Options:"></input>
                            <div id="contractChosenOptions">
                                {
                                this.state.contractOptions.map(
                                    contractOption=>{
                                        return(
                                        <div numId={contractOption} id={contractOption.id} className="oneOption">
                                            <div className="optionId" value={contractOption.id}></div>
                                            <input className="optionName" placeholder="option" required="true" value={contractOption.name}></input>
                                            <input className="optionCost" placeholder="option" required="true" value={contractOption.cost}></input>
                                            <input type="text" className="optionType" placeholder="type" value={contractOption.optionType}></input>
                                        </div>
                                        );
                                        }
                                    )
                                }
                            </div>

                            
                        </div>
                        <button className="submitModal" id="changeContract" onClick={this.changeContract}>change tariff / options</button>
                    </form>
                    
                </div>
            </div>
        </div>
        );
    }
}