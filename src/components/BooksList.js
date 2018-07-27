import React from 'react';
import BookItem from './BookItem';
import PropTypes from 'prop-types';

class BooksList extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  render(){

    return (
      <ol className="books-grid">
        {
          this.props.books.map((book)=>(
            <BookItem
              onUpdate={this.props.onUpdate}
              data={book}
              key={`item-${book.id}`}/>
          ))
        }
      </ol>
    )
  }

}

export default BooksList