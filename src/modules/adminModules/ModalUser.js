import react from "react";
import Requests from "../../HTTP/Requests";
import $ from "jquery"

export default class ModalUser extends react.Component{
    constructor(props){
        super(props)
        this.state={
            status:""
        }
        this.editUser = this.editUser.bind(this);
        this.changeBlockUser = this.changeBlockUser.bind(this);
    }

    componentDidMount(){
        Requests.getIsBlocked(this.props.userId).then((response)=>{
            let isBlockedDto = response.data;
            if(isBlockedDto.message==null){
                if(isBlockedDto.blocked){
                    this.setState({status:"Blocked"})
                    $(".isBlocked").addClass("blocked");
                }
                else{
                    this.setState({status:"Active"})
                    $(".isBlocked").addClass("unblocked");
                }
            }
            else{
                alert(isBlockedDto.message)
            }
        });
    }

    editUser(){
        this.props.refresh();
    }

    changeBlockUser(){
        Requests.changeBlockUserByAdmin(this.props.userId).then((response)=>{
            alert(response.data.message);
            window.location.reload();
        });
    }

    render(){
        return(
            <div>
            <div id="modalUserBody" className="modalBody">
                <div id="modalUserInfo">
                    <h1>Id: {this.props.userId} User {this.props.userName}</h1>
                    <div className="beforeBlock">status: </div>
                    <input className="isBlocked" type="text" value={this.state.status}></input>
                    <form>
                    <input id="UserTitle" type="text" placeholder="Title"></input>
                    <input id="UserDescription" type="text" placeholder="Description"></input>
                    <button className="submitModal" id="submitUser" onClick={this.editUser}>send</button>
                    </form>
                    <button onClick={this.changeBlockUser} className="changeBlock">change user status</button>
                </div>
            </div>
        </div>
        );
    }



}