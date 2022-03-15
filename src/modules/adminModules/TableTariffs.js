import react from "react";
import $ from "jquery";
import Requests from "../../HTTP/Requests";
import Pagination from '../Pagination.js';

class TableTariffs extends react.Component{
    constructor(props){
        super(props);
        this.state={
            head:[" ","Title","Description","Status"],
            info:[{id:1,title:"MegaSUPERBUPER",description:"vasya"}],
            totalElements: 0,
            elementsPerPage: 5,
            currentPage: 1
        }
        this.showModalTariff = this.showModalTariff.bind(this);
        this.paginate = this.paginate.bind(this);
    }

    componentDidMount(){
        let serverData = [];
        Requests.getAllTariffs().then((response)=>{
            response.data.map(tariff=>{
                let currTariff = {
                    id:tariff.id,
                    title:tariff.title,
                    description:tariff.description,
                    active:tariff.active
                }
                serverData.push(currTariff)
            });
            this.setState({info: serverData,totalElements:serverData.length});
        });
    }

    showModalTariff(e){
        var closestTr = $(e.target).closest("tr");
        var currentTariffId = closestTr.find(".currentTariffId").attr("currentTariffId");
        var currentTariffTitle = closestTr.find(".currentTariffTitle").text();
        var currentTariffDescription = closestTr.find(".currentTariffDescription").text();

        this.props.displayEdit(currentTariffId,currentTariffTitle,currentTariffDescription);
    }


    paginate = (pageNumber) => {
        this.setState({currentPage: pageNumber})
    }

    render(){
        const lastElemIdx = this.state.elementsPerPage*this.state.currentPage;
        const firstElemIdx = lastElemIdx-this.state.elementsPerPage;
        const currInfo = this.state.info.slice(firstElemIdx,lastElemIdx);

        return(
            <div>
                <div className="tableHeaderDiv">Tariffs</div>
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
                        currInfo.map(
                            tariff =>
                            <tr > 
                                <td className="currentTariffId" currentTariffId={tariff["id"]}></td>
                                <td className="currentTariffTitle">{tariff["title"]}</td>
                                <td className="currentTariffDescription">{tariff["description"]}</td>
                                <td className="currentTariffActive">{tariff["active"]?"Active":"Inactive"}</td>
                                <button onClick={this.showModalTariff}>show</button>
                            </tr>
                        )
                    }
                    
                </tbody>
            </table>
            <Pagination elementsPerPage={this.state.elementsPerPage} totalElements={this.state.totalElements} paginate={this.paginate}/>
        </div>
        );
    }
}
export default TableTariffs;