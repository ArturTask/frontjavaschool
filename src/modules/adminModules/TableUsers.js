import react from "react";
import Requests from "../../HTTP/Requests";
import $ from 'jquery'

class TableUsers extends react.Component{
    constructor(props){
        super(props)
        this.state={
            head:["Id","Login"],
            info:[]
        }
        this.makeMeHappy = this.makeMeHappy.bind(this);
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
            this.setState({info: serverData});
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

    render(){
        return(
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
                    this.state.info.map(
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
        );
    }
}

export default TableUsers;