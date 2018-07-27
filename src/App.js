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
    activeCategory: 'all',
    isHidden: true,
    targetScroll: 0,
    isLoading: false,
    error: null
  }

  // Books data helpers
  getBooks() {
    BooksAPI.getAll()
    .then(data => this.setState({books:data, isLoading:false}))
    .catch(err => this.setState({error:err, isLoading: false}));
  }

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

  // Move book
  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);
    this.getBooks();
  }

  changeCategory = (category) => {
    this.setState({activeCategory:category});
  }

  getCategories = () => {
    const categories = [];
    for (const key of new Set(this.state.books).keys()) {
      categories.push(key.shelf);
    }

    return Array.from(new Set(categories));
  }

  booksCount = (shelf) => {
    let counter = 0;
    if(shelf === 'all') return this.state.books.length;
    for (const key of this.state.books) {
      if (key.shelf.indexOf(shelf) > -1) counter++;
    }
    return counter;
  }

  // Handle events
  handleClickFilter = (e) => {
    e.preventDefault();
    this.setState({isHidden:!this.state.isHidden})
  }

  handleScroll = (e) => {
    let initVal = document.body.screenTop || document.documentElement.scrollTop;
    this.setState({targetScroll:initVal});
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidMount() {
    this.setState({isLoading:true});
    this.getBooks();
    window.addEventListener('scroll', this.handleScroll);
  }


  render() {
    return (
        <div className='app'>
        <Route exact path='/' render={()=>(
          <Home
          data={this.state.books}
          isHidden={this.state.isHidden}
          isLoading={this.state.isLoading}
          activeCategory={this.state.activeCategory}
          targetScroll={this.state.targetScroll}
          handleClickFilter={this.handleClickFilter}
          handleScroll={this.handleScroll}
          getCategories={this.getCategories}
          changeCategory={this.changeCategory}
          counter={this.booksCount}
          updateBookShelf={this.updateBookShelf}
          />
        )}/>
        <Route path='/search' render={()=>(
          <Search
          data={this.state.searchData}
          onSearchBooks={this.searchBooks}
          onUpdate={this.updateBookShelf}
          />
        )}/>
        </div>
    )
  }
}

export default BooksApp
