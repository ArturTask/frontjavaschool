import react from "react";

export default class extends react.Component{
    constructor(props){
        super(props)
        this.state={

        }
        this.editTariff = this.editTariff.bind(this);
    }

    editTariff(){

        this.props.refresh();
    }

    


    render(){
        return(
            <div>
            <div id="modalEditTariffBody" className="modalBody">
                <div id="modalEditTariffInfo">
                    <h1>Id: {this.props.tariffId}</h1>
                    <h1>Tit: {this.props.title}</h1>
                    <h1>Descr: {this.props.description}</h1>
                    
                    <input id="editTariffTitle" type="text" placeholder="Title"></input>
                    <input id="EditTariffDescription" type="text" placeholder="Description"></input>
                    <button className="submitModal" id="addEditTariff" onClick={this.editTariff}>send</button>
                    
                </div>
            </div>
        </div>
        );
    }
}