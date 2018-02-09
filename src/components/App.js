import React, { Component } from 'react';
import List from './List'
import TopBar from './TopBar'


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state ={
            books : [],
            isReady : false
        }
    }
    
    componentWillMount(){ //Request data from local folder, simulates request from server
        fetch('static/data/books.json')
        .then( response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            data.forEach( book => {
                this.setState({ books: [...this.state.books, book] })
            });      
        })
        .then(()=>{this.setState({isReady : true})
        })
        .catch( error => {
            console.error(`fetch operation failed: ${error.message}`);
        });
    }
    render() { 
        return ( 
            <div className="app-container">
            <TopBar />
            {this.state.isReady &&
                <List books={this.state.books} removeBookFromState={this.removeBookFromState} />
            }</div>
        )
    }
}