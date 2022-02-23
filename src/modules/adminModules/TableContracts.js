import react from "react";

class tableContracts extends react.Component{
    constructor(props){
        super(props)
        this.state={
            head:["Id","Phone number","User"],
            info:[{id:1,phoneNumber:234,user:"vasya"}]
        }

    }
    render(){
        return(
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
                    this.state.info.map(
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
        );
    }
}

export default tableContracts;