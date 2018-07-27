import React from 'react';
import PropTypes from 'prop-types';

class CategoryControl extends React.Component {
  static propTypes = {
    onChangeCategory: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onClickFilter: PropTypes.func.isRequired,
    counter: PropTypes.func.isRequired
  }

  state = {
    active:'all'
  }

  handleClick = (category) => {
    this.props.onChangeCategory(category);
    this.setState({active:category});
  }

  render(){

    const categories = ['all',...this.props.getCategories];

    return (
      <div className='open-categories-list'>
        <ul className={`list-books-category ${!this.props.show ? 'show' : ''}`} onClick={this.props.onClickFilter}>
          { categories.map((category, index) => (
            <li
              key={category}>
              <a
                tabIndex={`${!this.props.show ? '0': '-1'}`}
                key={category}
                className={`list-books-category-item ${category === this.state.active ? 'active' : 'current'}`}
                onClick={()=>this.handleClick(category)}
                href={`/#${category}`}>
                {category.replace(/([a-z])([A-Z])/g, "$1 $2")}
                ({this.props.counter(category)})</a>
            </li>))}
        </ul>
      </div>
    )
  }

}

export default CategoryControl