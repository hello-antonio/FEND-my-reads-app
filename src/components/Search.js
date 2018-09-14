import React from 'react';
import BooksList from './BooksList';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {DebounceInput} from 'react-debounce-input';
import './Search.css';

class Search extends React.Component {
  static propTypes = {
    onSearchBooks: PropTypes.func.isRequired,
    data: PropTypes.any,
    updateBookShelf: PropTypes.func.isRequired
  }

  state = {
    search:'',
    searchTerms:[],
    matchTerms: []
  }

  matchTerm = (query)=>{
    let match = [];
    for(let word of this.state.searchTerms) {
      if(word.toLowerCase().indexOf(query.toLowerCase()) > -1){
        match.push(word);
      }
    }
    this.setState({matchTerms:match});
  }

  handleChange = (event) => {
    this.setState({search:event.target.value});
    this.matchTerm(event.target.value);
  }
  handleClickClose = (event)=>{
    this.setState({search:''});
  }
  handleSubmit = (event)=>{
    this.props.onSearchBooks(this.state.search.toLowerCase().trim());
    event.preventDefault();
    event.target.reset();
  }

  getSearchTerms = ()=>{
    this.setState({searchTerms:['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']});
  }

  componentDidMount(){
    this.getSearchTerms();
  }

  componentWillUnmount(){
    this.getSearchTerms();
  }

  render(){
    const {data, updateBookShelf} = this.props;
    const Datalist = (props)=>{
      const terms = props.terms;
      const listItem = terms.map((item) =>
        <option key={item} value={item}/>
      );
      return (
        <datalist id='search'>
          {listItem}
        </datalist>
      );
    }

    const Results = ()=>{
      if(typeof data === 'object' && data !== null && data.length > 0 && this.state.search.length) {
        return <BooksList updateBookShelf={updateBookShelf}
        books={data}/>
      } else if(data === null) {
        return (
          <p style={{
            marginTop:'2em',
            fontSize:'2em',
            color:'grey',
            textAlign:'center'
          }}>No Results</p>
        )
      } else {
        return null;
      }
    }

    return (
      <div className="search-books" role='main'>
          <div className="search-books-bar">
            <div className='close-box'>
              <Link className="close-search" onClick={this.handleClickClose} to='/'>Close</Link>
            </div>
            <form className="search-books-input-wrapper" id='search-form' onSubmit={this.handleSubmit}>

              <DebounceInput
                aria-label='Search books by title or author'
                minLength={3}
                debounceTimeout={500}
                placeholder="Search by title or author"
                onChange={this.handleChange}
                className='search-input'
                value={this.state.search}
                maxLength={30}
                size={30}
                list='search'
              />
              <Datalist terms={this.state.searchTerms}/>
              <div className='search-box'>
                <input type="submit" value='Submit' className='search-button'/>
              </div>
              {/* <input type="search" name='q' value={this.state.search} minLength='3' maxLength='30' size='30' required placeholder="Search by title or author" id='search-input'  onChange={this.handleChange}/> */}

            </form>

          </div>

          <div className="search-books-results">
          <Results />

          </div>
        </div>
    )
  }

}

export default Search