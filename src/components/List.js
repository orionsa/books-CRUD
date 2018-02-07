import React, { Component } from 'react';
import Book from './Book'
import { Button } from 'react-bootstrap'
import MyModal from './MyModal'
import TableTop from './TableTop'
import DeleteModal from './DeleteModal'

let bookToDelete = {}
let titles =[]

export default class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: this.props.books,
            alertVisible: false,
            newBook: false,
           // titles: [],
            deleteModal: false,
            aproveDelete: false
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.submitChanges = this.submitChanges.bind(this)
        this.close = this.close.bind(this)
        this.listOfTitles = this.listOfTitles.bind(this)
        this.checkIfBookExist = this.checkIfBookExist.bind(this)
        this.deletionAproved = this.deletionAproved.bind(this)
    }
    componentWillMount() { //initialize the list of book titles in order to later be able to check if a book already exists
        this.state.books.map(item => this.listOfTitles(item))
    }
    handleDelete(book) { // Deletes a speciphic book from the lists
        this.setState(prevState => ({
            books: prevState.books.filter(el => el != book),
            deleteModal: false
        }));
        titles = titles.filter(el => el !=book.title)
    }
    close() { // Close the modal, passed as props and executed on click from MyModal component 
        this.setState({
            newBook: false,
            deleteModal: false
        })
    }
    checkIfBookExist(bookName) { //Check the books that already exists in the list, passed as props and executed as a part of the validation process
        return titles.indexOf(bookName) > -1
    }
    listOfTitles(book) { // Add new book to the titles list in order to verify there are no books duplications
        titles = [...titles, book.title.toLowerCase()]
        this.close()
    }
    deletionAproved() { // Executs deletion if user aproved it from child component
        this.handleDelete(bookToDelete)
    }
    submitChanges() { //Submits changes of a new book, passed as props and executed on click from MyModal component
        let author = document.querySelector('.author-input').value
        let date = document.querySelector('.date-input').value
        let title = document.querySelector('.title-input').value.replace(/[^\w\s]/gi, '')
        let book = {
            'author': author,
            'date': date,
            'title': title
        }
        if (this.checkIfBookExist(title)) {
            document.querySelector('.book-exist').style.display = 'block'
        }
        else {
            this.setState({
                books: [...this.state.books, book]
            }, this.listOfTitles(book))
        }
    }
    render() {
        return (
            <div className='list-main-container'>
                <TableTop />
                <ul className='table'>
                    {
                        this.state.books.map(item => {
                            return <li className='table-element' key={item.title}>
                                <Book book={item} submitChanges={this.submitChanges} ifBookExist={this.checkIfBookExist} />
                                <div className='delete-btn-wraper'><Button bsClass='delete-btn' onClick={() => {
                                    bookToDelete = item
                                    this.setState({ deleteModal: true })
                                }}>
                                </Button>
                                    <DeleteModal show={this.state.deleteModal}
                                                 delete={this.deletionAproved}
                                                 dontDelete={this.close}
                                                 bookName={bookToDelete.title} />
                                </div>
                            </li>
                        }
                        )
                    }
                </ul>
                <Button bsClass='add-btn' onClick={() => this.setState({ newBook: true })}></Button>
                <MyModal vis={this.state.newBook}
                    closeModal={this.close}
                    author=''
                    date=''
                    title=''
                    submit={this.submitChanges}
                    ifBookExist={this.checkIfBookExist} />
            </div>
        )
    }
}