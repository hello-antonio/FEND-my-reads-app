import React from 'react';
import BooksList from './BooksList';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {DebounceInput} from 'react-debounce-input';

class Search extends React.Component {
  static propTypes = {
    onSearchBooks: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  state = {
    search:''
  }

  handleSearch = (event) => {
    this.setState({search:event.target.value.toLowerCase().trim()});
    this.props.onSearchBooks(this.state.search);
  }

  render(){

    return (
      <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
            <div className="search-books-input-wrapper">
              <DebounceInput
                 minLength={2}
                 debounceTimeout={500}
                 placeholder="Search by title or author"
                 onChange={this.handleSearch}
              />
              {/* <input type="text" name='q' placeholder="Search by title or author" onChange={this.handleSearch} /> */}

            </div>
          </div>
          <div className="search-books-results">
          { this.props.data.length > 0 && this.state.search.length > 0
              ? (
                <BooksList
                onUpdate={this.props.onUpdate}
                books={this.props.data}/>
              )
              : (<p
                style={{
                  marginTop:'2em',
                  fontSize:'2em',
                  color:'grey',
                  textAlign:'center'
                }}
                >No Results</p>)
            }
          </div>
        </div>
    )
  }

}

export default Search