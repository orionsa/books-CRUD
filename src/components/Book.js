import React , {Component} from 'react'
import { Row, Col, Grid, Button } from 'react-bootstrap'
import MyModal from './MyModal'


export default class Book extends Component {
    constructor (props){
        super(props)
        this.state={
            visible : false,
            currentBook : {
                author : this.props.book.author,
                date : this.props.book.date,
                title : this.props.book.title
            }
        }
        this.close=this.close.bind(this)
        this.submitChanges = this.submitChanges.bind(this)
        this.checkBookBeforeUpdate = this.checkBookBeforeUpdate.bind(this)
    }
    close(){ // Close the modal, passed as props and executed on click from MyModal component 
        this.setState({visible: false,
})
    }
    submitChanges(){ //Submits changes, passed as props and executed on click from MyModal component
       let author = document.querySelector('.author-input').value
       let date = document.querySelector('.date-input').value
       let title = document.querySelector('.title-input').value.replace(/[^\w\s]/gi, '')
       this.setState({
           currentBook:{
               author : author,
               date : date,
               title : title
           }
       },this.close) 
    }
    checkBookBeforeUpdate(bookName){ //Check if the book is already on the list, gets a function that checks the book from a parent component and passed as props to MyModal to be executed as part of the validation process.
        return this.props.ifBookExist(bookName)
    }
    render (){
        return (
            <Grid >
                <Row className="show-grid">
                    <Col className="col">{this.state.currentBook.author}</Col>
                    <Col className="col">{this.state.currentBook.date}</Col>
                    <Col className="col">{this.state.currentBook.title.toLowerCase().replace(/(^| )(\w)/g, s => s.toUpperCase())}</Col>
                    <Col className="col"><Button bsClass='edit-btn' onClick={()=> this.setState({visible:true})}></Button></Col>
                    <Col className="col"><MyModal vis={this.state.visible} 
                                    closeModal={this.close}
                                    author={this.state.currentBook.author}
                                    date={this.state.currentBook.date}
                                    title={this.state.currentBook.title}
                                    submit={this.submitChanges}
                                    ifBookExist={this.checkBookBeforeUpdate}/> 
                    </Col>
                </Row>
            </Grid>
        )
    }
}












