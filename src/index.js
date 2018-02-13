import React from 'react';
import PropTypes from 'prop-types';

const LIT_IPSUM_URL = `https://litipsum.com/api/`;
const BOOKS = {
  holmes: 'adventures-sherlock-holmes',
  jekyll: 'dr-jekyll-and-mr-hyde',
  dracula: 'dracula',
  evelina: 'evelina',
  johnson: 'life-of-samuel-johnson',
  dorian: 'picture-of-dorian-gray',
  pride: 'pride-and-prejudice'
};

class LitIpsum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paragraphs: ['loading...'],
      error: ''
    };
  }

  componentWillMount() {
    this.state.error = '';

    let book = this.props.book;
    book = (book && BOOKS.hasOwnProperty(book)) ? BOOKS[book] + '/' : '';
    let paragraphs = (typeof this.props.paragraphs === 'number') ? Math.round(this.props.paragraphs) + '/' : '';

    fetch(LIT_IPSUM_URL + book + paragraphs + 'json')
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(response.statusText);
    })
    .then((json) => {
      if (Array.isArray(json.text)) {
        this.setState({paragraphs: json.text});
      }
      else {
        throw new Error('Unable to parse server response.');
      }
    })
    .catch(e => {
      this.setState({error: 'Error: ' + e.message});
    });
  }

  render() {
    return (
      <div className={"lit-ipsum"} id={this.props.id} style={this.props.style}>
        {
          (this.state.error !=+ '') ?
            <p>{this.state.error}</p> :
               this.state.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
         }
      </div>
    );
  }
}

LitIpsum.propTypes = {
  paragraphs: PropTypes.number,
  book: PropTypes.string,
  id: PropTypes.string
};

export default LitIpsum;
