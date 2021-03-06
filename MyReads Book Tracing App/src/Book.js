import React, { Component } from 'react';

class Book extends Component {

    render() {
        return (
                this.props.list.map((data) => {
                return(
                <li key={data.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${data.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select name="shelf"
                            onChange={e => this.props.changeCat(e, data)}
                            value={data.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{data.title}</div>
                      <div className="book-authors">{data.authors ? data.authors.join(", ") : ""}</div>
                    </div>
              </li>)
            })
        )
    }

}

export default Book