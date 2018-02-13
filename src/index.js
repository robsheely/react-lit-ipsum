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

/*A simple React component that loads placeholder test from [LitIpsum.com](https://litipsum.com/).
 "Lit Ipsum is a dummy text generator for web designers and developers. As an alternative to boring 
 old Lorem Ipsum generators, it chooses passages from copyright-free literature courtesy of the 
 Gutenberg Project. You can design using real English sentences."
*/
class LitIpsum extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      responseText: ['loading...'],
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
      // Fetch will only reject a promise if the user is offline, or some unlikely networking error occurs, 
      // such a DNS lookup failure. So, to catch any HTTP errors, we read the 'ok' flag which indicates 
      // whether an HTTP response’s status code is in the successful range or not. 
      if (response.ok) {
        return response.json()
      }
      throw new Error(response.statusText);
    })
    .then((json) => {
      if (json.text && Array.isArray(json.text)) {
        this.setState({responseText: json.text});
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
          (this.state.error !== '') ?
            <p>{this.state.error}</p> :
            this.state.responseText.map((paragraph, index) => <p key={index}>{paragraph}</p>)
         }
      </div>
    );
  }
}

LitIpsum.propTypes = {
  paragraphs: PropTypes.number,
  book: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object
};

export default LitIpsum;
