import react from "react";
import $ from "jquery";
import Requests from "../../HTTP/Requests";
import Pagination from '../Pagination.js';


export default class UsersTableTariff extends react.Component{
    constructor(props){
        super(props);
        this.state={
            head:[" ","Title","Description","Cost"],
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
        Requests.getAllActiveTariffs().then((response)=>{
            response.data.map(tariff=>{
                let currTariff = {
                    id:tariff.id,
                    title:tariff.title,
                    description:tariff.description,
                    cost:tariff.cost
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

        this.props.display(currentTariffId,currentTariffTitle,currentTariffDescription);
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
                <table id="usersTableTariffs" className="tableCustomers" >
                <thead>
                    <tr>
                        {this.state.head.map(elem=>
                            <th>{elem}</th>
                        )}
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
                                <td className="currentTariffDescription">{tariff["cost"]}</td>
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
