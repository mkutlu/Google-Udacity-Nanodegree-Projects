import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Book from './Book'

class BookList extends React.Component {
  state = {

  }

  render() {
    const currentlyReading = this.props.books.filter((book) => book.shelf === 'currentlyReading');
    const read = this.props.books.filter((book) => book.shelf === 'read');
    const wantToRead = this.props.books.filter((book) => book.shelf === 'wantToRead')
    return (
     <div className="list-books">          
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  <Book list={currentlyReading} changeCat={this.props.changeCatAppLayer} />
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Wants to Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  <Book list={wantToRead} changeCat={this.props.changeCatAppLayer} />
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  <Book list={read} changeCat={this.props.changeCatAppLayer} />
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a Book</Link>                                                                                                                                                      
        </div>
      </div>
    )
  }
}

export default BookList


