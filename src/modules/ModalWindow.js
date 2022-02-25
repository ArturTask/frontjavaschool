import react from "react";
import "../css/modal.css"

export default class ModalWindow extends react.Component {
    constructor(props){
        super(props)
        this.onClose = this.onClose.bind(this);
    }
    onClose(e){
        if(e.currentTarget==e.target){
            this.props.onClose();
        }
    }
    
    render() {
      return (
        <div class="modal" id="modal" onClick={this.onClose}>
            <button class="closeModalButton" onClick={this.onClose}>
              close
            </button>
          
          <div class="content" >
              {this.props.body}
          
          </div>
          
          

        </div>
      );
    }
  }