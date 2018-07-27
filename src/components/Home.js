import React from 'react';
import CategoryControl from './CategoryControl';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';

class Home extends React.Component {

  state = {
    activeCategory: 'all',
    isHidden: true,
    targetScroll: 0,
    error: null
  }

  getCategories = () => {
    const categories = [];
    if(this.props.data){
      for (const key of new Set(this.props.data).keys()) {
        categories.push(key.shelf);
      }
      if(categories) {
        return Array.from(new Set(categories));
      }
    }
    return categories;
  }

  booksCount = (shelf) => {
    let data = this.props.data;
    let counter = 0;
    if(shelf === 'all') return data.length;
    for (const key of data) {
      if (key.shelf.indexOf(shelf) > -1) counter++;
    }
    return counter;
  }

  changeCategory = (category) => {
    this.setState({activeCategory:category});
  }

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
    window.addEventListener('scroll', this.handleScroll);
  }

  render() {
    const {data, updateBookShelf, isLoading} = this.props;
    const {isHidden, activeCategory, targetScroll} = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title" onScroll={this.handleScroll}>
          <div className='open-filter'>
          <button onClick={this.handleClickFilter}>Filter by book shelf</button>
        </div>
        <div aria-label='My Reads Logo'
            className='brand-logo'
            style={{
              opacity:`${targetScroll > 50 ? '1':'0'}`
        }}/>
        <h1 role='banner'
            style={{
              opacity:`${targetScroll > 50 ? '0':'1'}`
        }} >MyReads</h1>
        <div className="open-search">
          <Link to='/search' onClick={(e) => {e.target.href = '/search'}}
              tabIndex={`${!isHidden ? '-1': '0'}`}>Add a book</Link>
        </div>
      </div>
      <CategoryControl
        counter={this.booksCount}
        onClickFilter={this.handleClickFilter}
        show={isHidden}
        getCategories={this.getCategories}
        onChangeCategory={this.changeCategory}
      />

      {
      isLoading
      ? (<p
      style={{
        height: '70vh',
        marginTop:'20vh',
        fontSize:'2em',
        color:'grey',
        textAlign:'center'
      }}
      >Loading...</p>)
      : (
      <div className="list-books-content" id='all'>
        <div>
          <BookShelf
            getCategories={this.getCategories}
            category={activeCategory}
            data={data}
            updateBookShelf={updateBookShelf}
          />
        </div>

      </div>
      )
      }
      <React.Fragment>
          <footer className='footer'><p>2018 MYREADS All Rights Reserved. Made by <a href='http://giovannilara.com'>Giovanni De Andre</a>.</p></footer>
      </React.Fragment>
      </div>
    )
  }
}

export default Home