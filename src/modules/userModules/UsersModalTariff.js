import react from "react";
import Requests from "../../HTTP/Requests";
import $ from "jquery";
import "../../css/userModalTariff.css"

export default class UsersModalTariff extends react.Component{
    constructor(props){
        super(props)
        this.state={
            options:[], /* number of option */
            counter:1,
            currentTatiff:{},
            currentOptions:[{}], /* options */
            initialNumberOfOptions:0
            
        }
        
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
        });

    }




    render(){
        return(
            <div>
            <button onClick={this.deleteTariff} id="deleteTariffButton">Delete tariff</button>
            <div id="modalEditTariffBody" className="modalBody">
                <div id="modalEditTariffInfo">
                    <form>
                        <h3>Id: {this.props.tariffId}</h3>
                        <h4>Title:</h4>
                        <input id="tariffEditTitle" className="inputModal" type="text" required="true" placeholder="Title" value={this.state.currentTatiff.title}></input>
                        <h4>Description:</h4>
                        <textarea id="tariffEditDescription" className="inputModal" type="text" required="true" placeholder="Description" cols="18" rows="4" value={this.state.currentTatiff.description}></textarea>
                        <h4>Cost:</h4>
                        <input id="tariffEditCost" className="inputModal" type="text" required="true" placeholder="Cost in $" value={this.state.currentTatiff.cost}></input>
                        <h4>Options:</h4>
                        <div id="userOptions">
                            <input className="beforeOptions" type="text" value="Name"></input>
                            <input className="beforeOptions" type="text" value="Type"></input>
                            {
                            this.state.options.map(
                                optionId=>
                                    <div numId={optionId-1} id={this.state.currentOptions[optionId-1].id} className="oneOption">
                                        <div className="optionId" value={this.state.currentOptions[optionId-1].id}>{optionId}</div>
                                        <input onChange={this.onChangeOptionName} className="optionName" placeholder="option" required="true" value={this.state.currentOptions[optionId-1].name}></input>
                                        <input numId={optionId-1} id={"select"+this.state.currentOptions[optionId-1].id} type="text" className="optionType" placeholder="type" value={this.state.currentOptions[optionId-1].optionType}></input>
                                    </div>
                                )
                            }
                        </div>
                        <button className="submitModal" id="addEditTariff" onClick={this.editTariff}>send</button>
                    </form>
                    
                </div>
            </div>
        </div>
        );
    }
}