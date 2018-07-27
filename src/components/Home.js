import React from 'react';
import CategoryControl from './CategoryControl';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';

class Home extends React.Component {
  render() {
    const {targetScroll, isHidden, isLoading, activeCategory, data, getCategories, counter, handleClickFilter, handleScroll, changeCategory, updateBookShelf} = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title" onScroll={handleScroll}>
          <div className='open-filter'>
          <button onClick={handleClickFilter}>Filter by book shelf</button>
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
        counter={counter}
        onClickFilter={handleClickFilter}
        show={isHidden}
        getCategories={getCategories}
        onChangeCategory={changeCategory}
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
            getCategories={getCategories}
            category={activeCategory}
            data={data}
            onUpdate={updateBookShelf}
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