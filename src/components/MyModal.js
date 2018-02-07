import React, { Component } from 'react';
import { Modal, Button, FieldGroup } from 'react-bootstrap'
import moment from 'moment'



export default class MyModal extends Component {
    constructor(props) {
        super(props)
        this.state ={
            author : this.props.author,
            date : this.props.date,
            title : this.props.title
        }
        this.onValueChange = this.onValueChange.bind(this)
        this.validation = this.validation.bind(this)
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            author : this.props.author,
            date : this.props.date,
            title : this.props.title
        })
    }
    onValueChange(){// Listen to changes inside the author, date, title fields
        this.setState({
                author : document.querySelector('.author-input').value,
                date : document.querySelector('.date-input').value,
                title : document.querySelector('.title-input').value,
        })
    }
    validation(){// Validates data, Executed when the user tries to update or add book
        let author = document.querySelector('.author-input').value
        let date = document.querySelector('.date-input').value
        let title = document.querySelector('.title-input').value.toLowerCase()
        let valid = true

        if (author === '') {// Make sure author is not an empty field
            document.querySelector('.author-error').style.display= 'block'
            valid = false
        }
        if (title === '') { // Make sure title is not an empty field
            document.querySelector('.title-error').style.display= 'block'
            valid = false
        }

        if (this.props.ifBookExist(title)){ // Make sure that there is no other book with the same title
            document.querySelector('.book-exist').style.display='block'
            valid = false
        }
        if (!moment(date, 'DD/MM/YYYY', true).isValid()){ // Make sure that the date is in the DD/MM/YYYY format using moment.js
            document.querySelector('.date-error').style.display= 'block'
            valid = false
        }
        
        if (valid) this.props.submit()
    }
    render() {
        return (
            <div className="static-modal">
                <Modal show={this.props.vis}  >
                    <Modal.Header>
                        <Modal.Title>Author</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <p className='author-error error'>Author must be filled</p>
                        <input className='author-input' value={this.state.author} onChange={this.onValueChange}></input>
                    </Modal.Body>
                    <Modal.Header>
                        <Modal.Title>Date</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <p className='date-error error'>Date should be in a DD/MM/YYYY format</p>
                        <input className='date-input' value={this.state.date} onChange={this.onValueChange}></input>
                    </Modal.Body>
                    <Modal.Header>
                        <Modal.Title>Title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <p className='title-error error'>Title must be filled</p>
                        <p className='book-exist error'>This book already exists on the list</p>
                        <input className='title-input' value={this.state.title} onChange={this.onValueChange}></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.closeModal}>Cancel</Button>
                        <Button  onClick={this.validation}> Save </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
