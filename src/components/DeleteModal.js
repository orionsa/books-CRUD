import React,{Component} from 'react';
import {Modal, Button} from 'react-bootstrap'

export default class DeleteModal extends Component{
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className="static-modal">
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>Are you sure you want to delete '{this.props.bookName}'?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={this.props.dontDelete}>No</Button>
                    <Button onClick={this.props.delete}> Yes </Button>
                </Modal.Footer>
            </Modal>
        </div>
        )
    } 
    }
