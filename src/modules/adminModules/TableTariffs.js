import react from "react";

class TableTariffs extends react.Component{
    constructor(props){
        super(props);
        this.state={
            head:["Id","Title","Description"],
            info:[{id:1,title:"MegaSUPERBUPER",description:"vasya"}]
        }
    }

    render(){
        return(
            <table id="tableTariffs" className="tableCustomers" >
            <thead>
                <tr>
                    {this.state.head.map(elem=>
                        <th>{elem}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {
                    this.state.info.map(
                        tariff =>
                        <tr > 
                            <td >{tariff["id"]}</td>
                            <td >{tariff["title"]}</td>
                            <td >{tariff["description"]}</td>
                        </tr>
                    )
                }
                
            </tbody>
        </table>
        );
    }
}
export default TableTariffs;