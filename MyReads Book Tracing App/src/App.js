import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BookList from './BookList'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     books: [],
     searchResults: []
  }

  changeCatAppLayer = (e, data) => {
    const books = this.state.books;
    const shelf = e.target.value;
    data.shelf = e.target.value;
    this.setState({
      books
    });

    BooksAPI.update(data, shelf).then(() => {
      this.setState(state => ({
        books: state.books
          .filter(b => b.id !== data.id)
          .concat([data])
      }));
    });
  };

  search = (query) => {
    if (query) {
      BooksAPI
        .search(query)
        .then((result) => {
          for (let data of Array.from(result)) {
            for (let book of this.state.books) {
              if (data.id === book.id) {
                data.shelf = book.shelf
              }
            }
          }
          this.setState({searchResults: result})
          if (result.error !== 'empty query') {
            this.setState({searchResults: result})
          } else {
            this.setState({searchResults: []})
          }
        })
    } else {
      this.setState({searchResults: []})
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }
  render() {
    return (
      <div className="app">
       <Route path="/search" render={() =>
          (
            <Search
                searchResults={this.state.searchResults}
                search={(query) => this.search(query)}
                changeCatAppLayer={this.changeCatAppLayer}/>
        ) 
      }/>
      <Route path="/" exact render={() => (
        <BookList books={this.state.books} changeCatAppLayer={this.changeCatAppLayer} />
      )}/>   
      </div>
    )
  }
}


export default BooksApp