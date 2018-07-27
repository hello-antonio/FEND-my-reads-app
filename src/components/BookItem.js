import React from 'react';
import PropTypes from 'prop-types';

class BookItem extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  handleShelfChange(e, book) {
    e.preventDefault();
    const value = e.target.value;
    if(book.shelf === undefined || book.shelf !== value) {
      return this.props.onUpdate(book, value);
    }
  }

  render(){

    const data = this.props.data;
    return (
      <li key={data.id} tabIndex='0'>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: '128px', height: '160px',
              backgroundImage: data.imageLinks !== undefined ? `url('${data.imageLinks.thumbnail})` : 'url("http://via.placeholder.com/128x193?text=No+Image")' }}></div>
            <div className="book-shelf-changer">
              <select aria-label='Shelf changer options' value={data.shelf || 'move'} onChange={(e)=>this.handleShelfChange(e,data)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{data.title}</div>
          <div className="book-authors">{data.authors}</div>
          <div className="book-rating">{data.averageRating}
          <div className={`${data.averageRating > 0 ? 'book-star' : ''}`}/></div>
        </div>
      </li>
    )
  }

}

export default BookItem