import React from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Search from './components/Search';
import Home from './components/Home';

class BooksApp extends React.Component {

  state = {
    books: [],
    searchData: [],
    error: null,
    isLoading: false
  }

  // Books data helpers
  getBooks() {
    BooksAPI.getAll()
    .then(data => this.setState({books:data, isLoading:false}))
    .catch(err => this.setState({error:err, isLoading: false}));
  }

  // Search helpers
  searchBooks = (query) => {
    if(query && query !== '') {
      BooksAPI.search(query, 20)
      .then(data => this.setState({searchData: this.filterSearchData(data)}))
      .catch(err => console.error(err, 'search'));
    }
  }

  filterSearchData = (searchData)=>{
    if(searchData && searchData.length > 0) {
      if(this.state.books && this.state.books.length > 0) {
        return searchData.filter(_book => {
          for (const book of this.state.books) {
            if(_book.id.indexOf(book.id) > -1) {
              _book.shelf = book.shelf
            }
          }
          return _book;
        });
      }
      return searchData;
    }
    return [];
  }

  // Books shelf helpers
  // keep here
  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);
    this.getBooks();
  }

  componentDidMount() {
    this.setState({isLoading:true});
    this.getBooks();
  }


  render() {
    return (
        <div className='app'>
        <Route exact path='/' render={()=>(
          <Home
          data={this.state.books}
          updateBookShelf={this.updateBookShelf}
          getBooks={this.getBooks}
          isLoading={this.state.isLoading}
          />
        )}/>
        <Route path='/search' render={()=>(
          <Search
          data={this.state.searchData}
          onSearchBooks={this.searchBooks}
          updateBookShelf={this.updateBookShelf}
          />
        )}/>
        </div>
    )
  }
}

export default BooksApp
