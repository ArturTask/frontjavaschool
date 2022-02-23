import react from "react";
import Requests from "../../HTTP/Requests";

class TableUsers extends react.Component{
    constructor(props){
        super(props)
        this.state={
            head:["Id","Login"],
            info:[]
        }
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
                            <td >{currentUser["id"]}</td>
                            <td >{currentUser["login"]}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        );
    }
}

export default TableUsers;