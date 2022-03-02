import react from "react";
import Pagination from '../Pagination.js';

class tableContracts extends react.Component{
    constructor(props){
        super(props)
        this.state={
            head:["Id","Phone number","User"],
            info:[{id:1,phoneNumber:234,user:"vasya"},{id:1,phoneNumber:234,user:"vasya"},{id:1,phoneNumber:234,user:"vasya"},{id:1,phoneNumber:234,user:"vasya"},{id:1,phoneNumber:234,user:"vasya"},{id:1,phoneNumber:234,user:"vasya"},{id:1,phoneNumber:234,user:"vasya"}],
            totalElements: 6,
            elementsPerPage: 5,
            currentPage: 1
        }
        this.paginate = this.paginate.bind(this);
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
                <table id="tableContracts" className="tableCustomers" >
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
                                contract =>
                                <tr > 
                                    <td >{contract["id"]}</td>
                                    <td >{contract["phoneNumber"]}</td>
                                    <td >{contract["user"]}</td>
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

export default tableContracts;