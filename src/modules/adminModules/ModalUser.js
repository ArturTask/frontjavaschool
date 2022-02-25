import react from "react";

export default class ModalUser extends react.Component{
    constructor(props){
        super(props)
        this.state={

        }
        this.editUser = this.editUser.bind(this);
    }

    editUser(){
        this.props.refresh();
    }

    render(){
        return(
            <div>
            <div id="modalUserBody" className="modalBody">
                <div id="modalUserInfo">
                    <h1>Id: {this.props.userId} User {this.props.userName}</h1>
                    <form>
                    <input id="UserTitle" type="text" placeholder="Title"></input>
                    <input id="UserDescription" type="text" placeholder="Description"></input>
                    <button className="submitModal" id="submitUser" onClick={this.editUser}>send</button>
                    </form>
                </div>
            </div>
        </div>
        );
    }



}