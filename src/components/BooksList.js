import React from 'react';
import BookItem from './BookItem';
import PropTypes from 'prop-types';

class BooksList extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  }

  render(){

    return (
      <ol className="books-grid">
        {
          this.props.books.map((book)=>(
            <BookItem
              updateBookShelf={this.props.updateBookShelf}
              data={book}
              key={`item-${book.id}`}/>
          ))
        }
      </ol>
    )
  }

}

export default BooksList