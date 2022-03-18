import react from "react";
import Requests from "../../HTTP/Requests";
import $ from "jquery";
import "../../css/userMainPageModalAndTable.css"

export default class UsersModalTariff extends react.Component{
    constructor(props){
        super(props)
        this.state={
            options:[], /* number of option */
            counter:1,
            currentTatiff:{},
            currentOptions:[{}], /* options */
            initialNumberOfOptions:0,
            currentPhoneNumber:""
            
        }
        this.showValueOfRadio=this.showValueOfRadio.bind(this);
        this.showChosenCheckButtons = this.showChosenCheckButtons.bind(this);
        this.checkPhoneNumber = this.checkPhoneNumber.bind(this);
        this.signContract = this.signContract.bind(this);
        // this.updateSelectOptions = this.updateSelectOptions.bind(this); used with componentDidUpdate
        this.changePhoneNumber = this.changePhoneNumber.bind(this);
    }

    componentDidMount(){
        Requests.getTariffById(this.props.tariffId).then((response)=>{
            this.setState({currentTatiff:response.data,
                 currentOptions:response.data.options,
                 counter: this.state.counter + response.data.options.length});
            
            let newOptions=[];
            for(let i=0;i<response.data.options.length;i++){
                newOptions.push(i+1);
            }
            this.setState({options:newOptions,initialNumberOfOptions:response.data.options.length});
        });

    }


    showValueOfRadio(){
        $(".radioInternet").each((i,el)=>{
            if($(el).prop("checked")){
                // alert($(el).val())
            }
        })
    }

    showChosenCheckButtons(){
        $(".checkboxUtil").each((i,el)=>{
            if($(el).prop("checked")){
                //alert($(el).val())
            }
        })
    }
    checkPhoneNumber(){

        if(/[8]{1}[7]{3}[0-9]{7}$/.test($("#usersPhoneNumberInput").val())){
            alert("fuck yeah")    
        }
    }

    //main Function
    signContract(e){

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
        // contract={
        //     phoneNumber:$("#usersPhoneNumberInput").val(),
        //     userId:localStorage.getItem("userId"),
        //     tariffId:this.props.tariffId,
        //     contractOptions:contractOptions
        // }

        if(localStorage.getItem("userRole")=="Admin"){//if we change tariff by admin
            contract={
                phoneNumber:$("#usersPhoneNumberInput").val().slice(0,11),
                userId:this.props.customerId,
                tariffId:this.props.tariffId,
                contractOptions:contractOptions
            }
        }
        else{ //if user changes tariff by himself
            contract={
                phoneNumber:$("#usersPhoneNumberInput").val().slice(0,11),
                userId:localStorage.getItem("userId"),
                tariffId:this.props.tariffId,
                contractOptions:contractOptions
            }
        }
        
        e.preventDefault();
        if(/[8]{1}[7]{3}[0-9]{7}$/.test($("#usersPhoneNumberInput").val())){
            Requests.postSignContract(contract).then((response)=>{
                alert(response.data.message);
                if(response.data.message=="Success"){
                    window.location.reload();
                }
            });
        }
        else{
            alert("incorrect phone number")
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
        return(
        <div>
            <div id="modalUsersTariffBody" className="modalBody">
                <div id="modalUsersTariffInfo">
                    <form>
                        <h3>Tariff</h3>
                        {/* <h4>Id: {this.props.tariffId}</h4> */}
                        <h4>Title:</h4>
                        <input id="tariffUsersTitle" className="inputModal" type="text" required="true" placeholder="Title" value={this.state.currentTatiff.title}></input>
                        <h4>Description:</h4>
                        <textarea id="tariffUsersDescription" className="inputModal" type="text" required="true" placeholder="Description" cols="18" rows="4" value={this.state.currentTatiff.description}></textarea>
                        <h4>Cost:</h4>
                        <input id="tariffUsersCost" className="inputModal" type="text" required="true" placeholder="Cost in $" value={this.state.currentTatiff.cost}></input>
                        <h4>Options:</h4>
                        <div id="userOptions">
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

                            <div id="usersPhoneNumberDiv" className="phoneNumberDiv">
                                <input type="text" id="usersPhoneNumberPattern" value={"Enter your new phone number only 8777*******  * - any 7 numbers "}></input>
                                <input type="tel" id="usersPhoneNumberInput" name="phone" placeholder="8777*******" pattern="[8]{1}[7]{3}[0-9]{7}$" required value={this.state.currentPhoneNumber} onChange={this.changePhoneNumber} onFocus={this.changePhoneNumber}></input>                            
                            </div>
                        </div>
                        <button className="submitModal" id="signContract" onClick={this.signContract}>sign contract</button>
                    </form>
                    
                </div>
            </div>
        </div>
        );
    }
}