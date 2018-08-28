import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'

class Search extends Component {

    render() {
        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" onChange={(event) => this.props.search(event.target.value)}/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  <Book list={this.props.searchResults} changeCat={this.props.changeCatAppLayer}/>
                </ol>
              </div>
            </div>
            )
    }

}

export default Search          
