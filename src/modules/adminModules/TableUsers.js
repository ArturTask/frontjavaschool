import react from "react";
import Requests from "../../HTTP/Requests";
import $ from 'jquery'
import Pagination from '../Pagination.js';

class TableUsers extends react.Component{
    constructor(props){
        super(props)
        this.state={
            head:["Id","Login"],
            info:[],
            totalElements: 0,
            elementsPerPage: 5,
            currentPage: 1
        }
        this.makeMeHappy = this.makeMeHappy.bind(this);
        this.paginate = this.paginate.bind(this);
    }

    componentDidMount(){
        let serverData = [];
        Requests.getAllUsers().then((response)=>{
            response.data.map(user=>{
                let currentUser = {
                    id:user.id,
                    login:user.login
                }
                serverData.push(currentUser)
            });
            this.setState({info: serverData,totalElements:serverData.length});
        });
    }

    makeMeHappy(e){

        var chosenUserId = $(e.target).closest("tr")   // Finds the closest row <tr> 
        .find(".currentUserId")     // Gets a descendent with class="nr"
        .attr("userId");         // Retrieves the text within <td>
        
        var chosenUserName = $(e.target).closest("tr")  
        .find(".currentUserName")     
        .text();       
        
        // alert(chosenUserName)
        this.props.display(chosenUserId,chosenUserName);
    
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
            <table id="tableUsers" className="tableCustomers" >
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
                            currentUser =>
                            <tr > 
                                <td className="currentUserId" userId={currentUser["id"]}>{currentUser["id"]}</td>
                                <td className="currentUserName">{currentUser["login"]}</td>
                                <button id="showUser" onClick={this.makeMeHappy}>edit</button>
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

export default TableUsers;