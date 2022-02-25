import react from "react";
import Requests from "../../HTTP/Requests";

export default class ModalTariff extends react.Component{
    constructor(props){
        super(props)
        this.state={

        }
        this.addTariff = this.addTariff.bind(this);    
    }


    addTariff(){
        let title = document.getElementById("tariffTitle").value;
        let descr = document.getElementById("tariffDescription").value;
        Requests.postAddTariff({title:title,description:descr});
        this.props.refresh(); //reload this f*** page
    }


    render(){
        return(
            <div>
            <div id="modalTariffBody" className="modalBody">
                <div id="modalTariffInfo">
                    <h1>Add new Tariff</h1>
                    <form>
                    <input id="tariffTitle" type="text" placeholder="Title"></input>
                    <input id="tariffDescription" type="text" placeholder="Description"></input>
                    <button className="submitModal" id="addTariff" onClick={this.addTariff}>send</button>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}