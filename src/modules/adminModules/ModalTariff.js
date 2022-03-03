import react from "react";
import Requests from "../../HTTP/Requests";
import $ from "jquery";

export default class ModalTariff extends react.Component{
    constructor(props){
        super(props)
        this.state={
            options:[],
            counter:1
        }
        this.addTariff = this.addTariff.bind(this);
        this.addOption = this.addOption.bind(this);    
        this.deleteOption = this.deleteOption.bind(this);
    }


    addTariff(){
        let title = document.getElementById("tariffTitle").value;
        let descr = document.getElementById("tariffDescription").value;
        let cost = document.getElementById("tariffCost").value;

        let optionNames = [];
        let optionCosts = [];
        let optionTypes = [];
        let chosenOptions = [];
        $(".optionName").each((id,el)=>{
            optionNames.push($(el).val());
        })
        $(".optionCost").each((id,el)=>{
            optionCosts.push($(el).val());
        })
        $(".optionType").each((id,el)=>{
            optionTypes.push($(el).find(":selected").val()); //get atribute value of selected option from select element
        })

        for(let i=0; i<optionNames.length; i++){
            chosenOptions.push({
                name: optionNames[i],
                cost:optionCosts[i],
                optionType: optionTypes[i]
            })
        }

        const currTariff ={
            title:title,
            description:descr,
            cost:cost,
            options:chosenOptions
        }

        if(title!=="" && !optionNames.includes("")){ //if title is filled and option names too
            Requests.postAddTariff(currTariff);
            this.props.refresh(); //reload this f*** page
        }
    }


    addOption(){
        let newOptions=this.state.options;
        newOptions.push(this.state.counter);
        this.setState({options:newOptions, counter:this.state.counter+1});
    }

    deleteOption(){
        let newOptions=this.state.options;
        newOptions.pop();
        let newCounter = this.state.counter;
        if(this.state.counter>1){
            newCounter--;
        }
        this.setState({options:newOptions, counter:newCounter});
    }



    render(){
        return(
            <div>
            <div id="modalTariffBody" className="modalBody">
                <div id="modalTariffInfo">
                    <h1>Add new Tariff</h1>
                    <form>
                    <input id="tariffTitle" className="inputModal" type="text" required="true" placeholder="Title"></input>
                    {/* <input id="tariffDescription" className="inputModal" type="text" required="true" placeholder="Description"></input> */}
                    <textarea id="tariffDescription" className="inputModal" type="text" required="true" placeholder="Description" cols="18" rows="4" ></textarea>
                    <input id="tariffCost" className="inputModal" type="text" required="true" placeholder="Cost in $"></input>
                    <div id="addOptions">
                        {
                        this.state.options.map(
                            optionId=>
                                <div className="oneOption">
                                    <div className="optionId">{optionId}</div>
                                    <input className="optionName" placeholder="option" required="true"></input>
                                    <input className="optionCost" placeholder="cost in $" required="true"></input>
                                    <select className="optionType">
                                        <option disabled>Tariff type</option>
                                        <option value="INTERNET">Internet</option>
                                        <option value="MINUTES">Minutes</option>
                                        <option value="MESSAGES">Messages</option>
                                        <option value="UTIL">Util</option>
                                    </select>
                                </div>
                            )
                        }
                    </div>
                    <button onClick={this.addOption}>add Option</button>
                    <button onClick={this.deleteOption}>delete Option</button>
                    <button className="submitModal" id="addTariff" onClick={this.addTariff}>send</button>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}