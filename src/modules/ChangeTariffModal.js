import react from "react";
import "../css/changeTariffModal.css"
import Requests from "../HTTP/Requests";
import $ from "jquery"

export default class ChangeTariffModal extends react.Component{
    constructor(props){
        super(props)

        this.state={
            tariffs:[],
            options:[],
            currentTatiff:{},
            currentOptions:[],
            oldContractId:-1
        }


        this.onClose = this.onClose.bind(this);
        this.showChosenTariff = this.showChosenTariff.bind(this);
        this.changeContract = this.changeContract.bind(this);
    }

    componentDidMount(){

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
        });
    }

    onClose(e){
        if(e.currentTarget==e.target){
            this.props.onClose();
        }
    }

    showChosenTariff(e){
        this.setState({options:[]}) //clean old options of prev tariff
        Requests.getTariffById($(e.target).val()).then((response)=>{
            this.setState(
                {
                    currentTatiff:response.data,
                    currentOptions:response.data.options
                });
            
            let newOptions=[];
            for(let i=0;i<response.data.options.length;i++){
                newOptions.push(i+1);
            }
            this.setState({options:newOptions});
        });
    }

    //main function
    changeContract(e){
        e.preventDefault();
        Requests.deleteContract(this.state.oldContractId).then((response)=>{
            // alert(response.data.message);
            if(response.data.message!=="Delete success"){
                alert(response.data.message);
            }
            else{
                
                let contract ={};
                let contractOptions = [];

                //parse options
                $(".radioInternet").each((i,el)=>{
                    if($(el).prop("checked")){
                        contractOptions.push(
                            {
                                id:$(el).val(),
                                name: $(el).attr("contractOptionName"),
                                optionType:"INTERNET",
                                cost: $(el).attr("contractOptionCost")
                            });
                    }
                })

                $(".radioMinutes").each((i,el)=>{
                    if($(el).prop("checked")){
                        contractOptions.push(
                            {
                                id:$(el).val(),
                                name: $(el).attr("contractOptionName"),
                                optionType:"MINUTES",
                                cost: $(el).attr("contractOptionCost")
                            });
                    }
                })

                $(".radioMessages").each((i,el)=>{
                    if($(el).prop("checked")){
                        contractOptions.push(
                            {
                                id:$(el).val(),
                                name: $(el).attr("contractOptionName"),
                                optionType:"MESSAGES",
                                cost: $(el).attr("contractOptionCost")
                            });
                    }
                })

                $(".checkboxUtil").each((i,el)=>{
                    if($(el).prop("checked")){
                        contractOptions.push(
                            {
                                id:$(el).val(),
                                name: $(el).attr("contractOptionName"),
                                optionType:"UTIL",
                                cost: $(el).attr("contractOptionCost")
                            });
                    }
                })

                //our dto

                if(localStorage.getItem("userRole")=="Admin"){//if we change tariff by admin
                    
                    contract={
                        phoneNumber:this.props.oldPhoneNumber,
                        userId:this.props.customerId,
                        tariffId:this.state.currentTatiff.id,
                        contractOptions:contractOptions
                    }
                }
                else{ //if user changes tariff by himself
                    contract={
                        phoneNumber:this.props.oldPhoneNumber,
                        userId:localStorage.getItem("userId"),
                        tariffId:this.state.currentTatiff.id,
                        contractOptions:contractOptions
                    }
                }
                
                
                e.preventDefault();
                Requests.postSignContract(contract).then((response)=>{
                    alert(response.data.message);
                    if(response.data.message=="Success"){
                        window.location.reload();
                    }
                });




            }
        })
    }

    
    render() {
      return (
        <div class="modalChangeContract" onClick={this.onClose}>
            <button class="closeModalButton" onClick={this.onClose}>
              close
            </button>
            <div className="changeContractContent" >
                <h3 >Choose new tariff</h3>
                <select className="tariffToChoose" onChange={this.showChosenTariff}>
                    <option disabled value="">Tariff</option>
                    {
                        this.state.tariffs.map((tariff)=>{
                            return(
                                <option value={tariff.id}>{tariff.title}</option>
                        );
                        })
                    }
                </select>
                {($(".tariffToChoose").find(":selected").val()!=="")?
                <div className="modalBody">
                    <div className="modalChangeContractTariff">
                        <form>
                            <h4>Title:</h4>
                            <input id="tariffChangeContractTitle" className="inputModal" type="text" required="true" placeholder="Title" value={this.state.currentTatiff.title}></input>
                            <h4>Description:</h4>
                            <textarea id="tariffChangeContractDescription" className="inputModal" type="text" required="true" placeholder="Description" cols="18" rows="4" value={this.state.currentTatiff.description}></textarea>
                            <h4>Cost in $:</h4>
                            <input id="tariffChangeContractCost" className="inputModal" type="text" required="true" placeholder="Cost in $" value={this.state.currentTatiff.cost}></input>
                            <h4>Options:</h4>
                            <div className="changeContractOptions">
                                <input className="beforeOptions" type="text" value="Name"></input>
                                <input className="beforeOptions" type="text" value="Cost in $"></input>
                                <input className="beforeOptions" type="text" value="Type"></input>
                                
                                <input className="betweenOptionTypes" type="text" value="Internet"></input>
                                <div id="internetRadioButtons">
                                    {
                                    this.state.options.map(
                                        optionId=>{
                                            if(this.state.currentOptions[optionId-1].optionType=="INTERNET"){
                                                return(
                                                <div numId={optionId-1} id={this.state.currentOptions[optionId-1].id} className="oneOption">
                                                    <div className="optionId" value={this.state.currentOptions[optionId-1].id}>{" "}</div>
                                                    <input type="radio" className="radioInternet" value={this.state.currentOptions[optionId-1].id} onChange={this.showValueOfRadio} name="intrenet_radio_button" contractOptionName={this.state.currentOptions[optionId-1].name} contractOptionCost={this.state.currentOptions[optionId-1].cost} />
                                                    <input className="optionName" placeholder="option" required="true" value={this.state.currentOptions[optionId-1].name}></input>
                                                    <input className="optionCost" placeholder="option" required="true" value={this.state.currentOptions[optionId-1].cost}></input>
                                                    <input numId={optionId-1} id={"select"+this.state.currentOptions[optionId-1].id} type="text" className="optionType" placeholder="type" value={this.state.currentOptions[optionId-1].optionType}></input>
                                                </div>
                                                );
                                            }
                                            
                                            }
                                        )
                                    }
                                </div>

                                <input className="betweenOptionTypes" type="text" value="Minutes"></input>
                                <div id="minutesRadioButtons">
                                    {
                                    this.state.options.map(
                                        optionId=>{
                                            if(this.state.currentOptions[optionId-1].optionType=="MINUTES"){
                                                return(
                                                <div numId={optionId-1} id={this.state.currentOptions[optionId-1].id} className="oneOption">
                                                    <div className="optionId" value={this.state.currentOptions[optionId-1].id}>{" "}</div>
                                                    <input type="radio" className="radioMinutes" value={this.state.currentOptions[optionId-1].id} onChange={this.showValueOfRadio} name="minutes_radio_button" contractOptionName={this.state.currentOptions[optionId-1].name} contractOptionCost={this.state.currentOptions[optionId-1].cost} />
                                                    <input className="optionName" placeholder="option" required="true" value={this.state.currentOptions[optionId-1].name}></input>
                                                    <input className="optionCost" placeholder="option" required="true" value={this.state.currentOptions[optionId-1].cost}></input>
                                                    <input numId={optionId-1} id={"select"+this.state.currentOptions[optionId-1].id} type="text" className="optionType" placeholder="type" value={this.state.currentOptions[optionId-1].optionType}></input>
                                                </div>
                                                );
                                            }
                                            
                                            }
                                        )
                                    }
                                </div>

                                <input className="betweenOptionTypes" type="text" value="Messages"></input>
                                <div id="messagesRadioButtons">
                                    {
                                    this.state.options.map(
                                        optionId=>{
                                            if(this.state.currentOptions[optionId-1].optionType=="MESSAGES"){
                                                return(
                                                <div numId={optionId-1} id={this.state.currentOptions[optionId-1].id} className="oneOption">
                                                    <div className="optionId" value={this.state.currentOptions[optionId-1].id}>{" "}</div>
                                                    <input type="radio" className="radioMessages" value={this.state.currentOptions[optionId-1].id} onChange={this.showValueOfRadio} name="messages_radio_button" contractOptionName={this.state.currentOptions[optionId-1].name} contractOptionCost={this.state.currentOptions[optionId-1].cost} />
                                                    <input className="optionName" placeholder="option" required="true" value={this.state.currentOptions[optionId-1].name}></input>
                                                    <input className="optionCost" placeholder="option" required="true" value={this.state.currentOptions[optionId-1].cost}></input>
                                                    <input numId={optionId-1} id={"select"+this.state.currentOptions[optionId-1].id} type="text" className="optionType" placeholder="type" value={this.state.currentOptions[optionId-1].optionType}></input>
                                                </div>
                                                );
                                            }
                                            
                                            }
                                        )
                                    }
                                </div>

                                <input className="betweenOptionTypes" type="text" value="Util"></input>
                                <div id="utillCheckboxButtons">
                                    {
                                    this.state.options.map(
                                        optionId=>{
                                            if(this.state.currentOptions[optionId-1].optionType=="UTIL"){
                                                return(
                                                <div numId={optionId-1} id={this.state.currentOptions[optionId-1].id} className="oneOption">
                                                    <div className="optionId" value={this.state.currentOptions[optionId-1].id}>{" "}</div>
                                                    <input type="checkbox" className="checkboxUtil" value={this.state.currentOptions[optionId-1].id} onChange={this.showChosenCheckButtons} name="util_checkbox_button" contractOptionName={this.state.currentOptions[optionId-1].name} contractOptionCost={this.state.currentOptions[optionId-1].cost}  />
                                                    <input className="optionName" placeholder="option" required="true" value={this.state.currentOptions[optionId-1].name}></input>
                                                    <input className="optionCost" placeholder="option" required="true" value={this.state.currentOptions[optionId-1].cost}></input>
                                                    <input numId={optionId-1} id={"select"+this.state.currentOptions[optionId-1].id} type="text" className="optionType" placeholder="type" value={this.state.currentOptions[optionId-1].optionType}></input>
                                                </div>
                                                );
                                            }
                                            
                                            }
                                        )
                                    }
                                </div>

                                <div className="phoneNumberDiv">
                                    <input type="text" id="usersPhoneNumberPattern" value={"Your phone number"}></input>
                                    <input type="tel" id="usersPhoneNumberInput" name="phone" placeholder="8777*******" pattern="[8]{1}[7]{3}[0-9]{7}$" required value={this.props.oldPhoneNumber}></input>                            
                                </div>
                            </div>
                            <button className="submitModal" onClick={this.changeContract}>change tariff</button>
                        </form>
                        
                    </div>
                </div>
                :
                <div></div>
                }
            
            </div>
            
            

        </div>
      );
    }
}