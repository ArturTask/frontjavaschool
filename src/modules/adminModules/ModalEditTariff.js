import react from "react";
import Requests from "../../HTTP/Requests";
import $ from "jquery";

export default class extends react.Component{
    constructor(props){
        super(props)
        this.state={
            options:[], /* number of option */
            counter:1,
            currentTatiff:{},
            currentOptions:[{}], /* options */
            initialNumberOfOptions:0
            
        }
        this.editTariff = this.editTariff.bind(this);
        this.addOption = this.addOption.bind(this);
        this.deleteOptionById = this.deleteOptionById.bind(this);
        this.onChangeOptionName = this.onChangeOptionName.bind(this);
        this.onChangeOptionCost = this.onChangeOptionCost.bind(this);
        this.onChangeOptionType = this.onChangeOptionType.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.deleteTariff = this.deleteTariff.bind(this);
        // this.updateSelectOptions = this.updateSelectOptions.bind(this); used with componentDidUpdate
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
            if(response.data.active){
                $("#optionStatus").html("Active");
                $("#optionStatus").addClass("activeStatus");
            }
            else{
                $("#optionStatus").html("Inactive");
                $("#optionStatus").addClass("inactiveStatus");
            }
        });

    }

    onChangeTitle(e){
        let newCurrentTariff = this.state.currentTatiff;
        newCurrentTariff.title=e.target.value;
        this.setState({currentTariff:newCurrentTariff})

    }

    onChangeDescription(e){
        let newCurrentTariff = this.state.currentTatiff;
        newCurrentTariff.description=e.target.value;
        this.setState({currentTariff:newCurrentTariff})
        

    }

    onChangeCost(e){
        let newCurrentTariff = this.state.currentTatiff;
        newCurrentTariff.cost=e.target.value;
        this.setState({currentTariff:newCurrentTariff})
        

    }

    onChangeOptionName(e){
        let numId = $(e.target).closest("div").attr("numId");
        let newCurrentOptions = this.state.currentOptions;
        newCurrentOptions[numId].name = e.target.value;
        this.setState({currOptions:newCurrentOptions});
    }

    onChangeOptionCost(e){
        let numId = $(e.target).closest("div").attr("numId");
        let newCurrentOptions = this.state.currentOptions;
        newCurrentOptions[numId].cost = e.target.value;
        this.setState({currOptions:newCurrentOptions});
    }

    onChangeOptionType(e){
        let numId = $(e.target).attr("numId");
        let newCurrentOptions = this.state.currentOptions;
        newCurrentOptions[numId].optionType = e.target.value;
        this.setState({currOptions:newCurrentOptions});

    }
    
    editTariff(){ //main Func
        // $(".optionType").each((id,el)=>{
        //     alert($(el).find(":selected").val()); //get atribute value of selected option from select element
        // })

        let title = document.getElementById("tariffEditTitle").value;
        let descr = document.getElementById("tariffEditDescription").value;
        let cost = document.getElementById("tariffEditCost").value;

        let optionNames = [];
        let optionTypes = [];
        let optionIds = [];
        let chosenOptions = [];
        let optionCosts = [];

        $(".optionName").each((id,el)=>{
            optionNames.push($(el).val());
        })
        $(".optionCost").each((id,el)=>{
            optionCosts.push($(el).val());
        })
        $(".optionType").each((id,el)=>{
            optionTypes.push($(el).find(":selected").val()); //get atribute value of selected option from select element
        })
        $(".optionId").each((id,el)=>{
            optionIds.push($(el).attr("value")); 
        })

        for(let i=0; i<optionNames.length; i++){
            // optionId = -1 if its new
                chosenOptions.push({
                    id:optionIds[i],
                    name: optionNames[i],
                    cost:optionCosts[i],
                    optionType: optionTypes[i]
                })
            
            
        }

        const currTariff ={
            id: this.props.tariffId,
            title:title,
            description:descr,
            cost:cost,
            options:chosenOptions
        }

        if(title!=="" && !optionNames.includes("") && !optionCosts.includes("")){ //if title is filled and option names too
            // INFO: optionId = -1 if its new TEST
            // for (let i = 0; i < currTariff.options.length; i++) {
            //     alert(currTariff.options[i].name+"  "+currTariff.options[i].id)
            // }

            // for (let i = 0; i < currTariff.options.length; i++) {
            //     alert(currTariff.options[i].name+"  "+currTariff.options[i].id)
            // }

            Requests.postUpdateTariff(currTariff);
            this.props.refresh(); //reload this f*** page
        }
        // this.props.refresh();



    }

    deleteTariff(){
        Requests.deleteTariff(this.props.tariffId);
        this.props.refresh(); //reload this f*** page
    }


    addOption(){
        let newOptions=this.state.options;
        let newCurrentOptions = this.state.currentOptions;
        newOptions.push(this.state.counter);
        newCurrentOptions.push({
            id: "-1",
            name: "",
            optionType: "INTERNET",
            tariffId: this.state.currentTatiff.id
        })
        this.setState({options:newOptions, counter:this.state.counter+1,currentOptions:newCurrentOptions});
    }

    deleteOptionById(e){
        e.preventDefault();
        let parentDiv = $(e.target).closest("div");
        var numberOptionId = parentDiv.find(".optionId").text()-1;
        var realCurrentOptionId = parentDiv.find(".optionId").attr("value");
        
        //if(numberOptionId<this.state.initialNumberOfOptions){//if we delete existing option
            let newCurrentOptions = this.state.currentOptions;
            newCurrentOptions.splice(numberOptionId,1);
            this.setState({
                currentOptions:newCurrentOptions,
                initialNumberOfOptions:this.state.initialNumberOfOptions-1
            });
        //}   

        let newOptions = this.state.options.slice(0,this.state.options.length-1);
        // newOptions.splice(numberOptionId,1);
        // for(let i=numberOptionId;i<newOptions.length;i++){
        //     newOptions[i]=newOptions[i]-1;
        // }
        this.setState({options:newOptions});
        
        let newCounter = this.state.counter;
        if(this.state.counter>1){
            newCounter--;
        }
        this.setState({counter:newCounter});

        $("div.oneOption select").each((id,el)=>{ //to proper change optionType
            $(el).find("option[value=\""+this.state.currentOptions[$(el).attr("numId")].optionType+"\"").attr("selected","selected");

        })

    }


    


    render(){
        return(
            <div>
            <button onClick={this.deleteTariff} id="changeTariffStatusButton">change status</button>
            <div id="modalEditTariffBody" className="modalBody">
                <div id="modalEditTariffInfo">
                    <form>
                        <h3>Tariff</h3>
                        <div className="inlineOptionTitle">Id: </div> <h3 className="inlineOptionTitle">{this.props.tariffId}</h3> <div id="inlineOptionStatus" className="inlineOptionTitle">status: </div> <h3 id="optionStatus" className="inlineOptionTitle activeStatus">Active</h3>
                        <h4>Title:</h4>
                        <input onChange={this.onChangeTitle} id="tariffEditTitle" className="inputModal" type="text" required="true" placeholder="Title" value={this.state.currentTatiff.title}></input>
                        <h4>Description:</h4>
                        <textarea onChange={this.onChangeDescription} id="tariffEditDescription" className="inputModal" type="text" required="true" placeholder="Description" cols="18" rows="4" value={this.state.currentTatiff.description}></textarea>
                        <h4>Cost in $:</h4>
                        <input onChange={this.onChangeCost} id="tariffEditCost" className="inputModal" type="text" required="true" placeholder="Cost in $" value={this.state.currentTatiff.cost}></input>
                        <h4>Options:</h4>
                        <div id="editOptions">
                            {
                            this.state.options.map(
                                optionId=>
                                    <div numId={optionId-1} id={this.state.currentOptions[optionId-1].id} className="oneOption">
                                        <div className="optionId" value={this.state.currentOptions[optionId-1].id}>{optionId}</div>
                                        <input onChange={this.onChangeOptionName} className="optionName" placeholder="option" required="true" value={this.state.currentOptions[optionId-1].name}></input>
                                        <input onChange={this.onChangeOptionCost} className="optionCost" value={this.state.currentOptions[optionId-1].cost} placeholder="cost in $" required="true"></input>
                                        <select onChange={this.onChangeOptionType} numId={optionId-1} id={"select"+this.state.currentOptions[optionId-1].id} className="optionType">
                                            <option disabled>Tariff type</option>
                                            <option selected value={this.state.currentOptions[optionId-1].optionType}>{this.state.currentOptions[optionId-1].optionType}</option>
                                            <option value="INTERNET">INTERNET</option>
                                            <option value="MINUTES">MINUTES</option>
                                            <option value="MESSAGES">MESSAGES</option>
                                            <option value="UTIL">UTIL</option>
                                        </select>
                                        <button className="deleteOptionButton" onClick={this.deleteOptionById}>del</button>
                                    </div>
                                )
                            }
                        </div>
                        <button onClick={this.addOption}>add Option</button>

                        <button className="submitModal" id="addEditTariff" onClick={this.editTariff}>send</button>
                    </form>
                    
                </div>
            </div>
        </div>
        );
    }
}