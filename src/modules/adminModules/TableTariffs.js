import react from "react";
import $ from "jquery";

class TableTariffs extends react.Component{
    constructor(props){
        super(props);
        this.state={
            head:["Id","Title","Description"],
            info:[{id:1,title:"MegaSUPERBUPER",description:"vasya"}]
        }
        this.showModalTariff = this.showModalTariff.bind(this);
    }

    showModalTariff(e){
        var closestTr = $(e.target).closest("tr");
        var currentTariffId = closestTr.find(".currentTariffId").attr("currentTariffId");
        var currentTariffTitle = closestTr.find(".currentTariffTitle").text();
        var currentTariffDescription = closestTr.find(".currentTariffDescription").text();

        this.props.displayEdit(currentTariffId,currentTariffTitle,currentTariffDescription);
    }

    render(){
        return(
            <table id="tableTariffs" className="tableCustomers" >
            <thead>
                <tr>
                    {this.state.head.map(elem=>
                        <th>{elem}</th>
                    )}
                    <th><button onClick={this.props.display}>add</button></th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.info.map(
                        tariff =>
                        <tr > 
                            <td className="currentTariffId" currentTariffId={tariff["id"]}>{tariff["id"]}</td>
                            <td className="currentTariffTitle">{tariff["title"]}</td>
                            <td className="currentTariffDescription">{tariff["description"]}</td>
                            <button onClick={this.showModalTariff}>edit</button>
                        </tr>
                    )
                }
                
            </tbody>
        </table>
        );
    }
}
export default TableTariffs;