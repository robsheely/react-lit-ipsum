# [React Litipsum Component](https://github.com/robsheely/react-lit-ipsum/)

*A simple React component that loads placeholder test from [LitIpsum.com](https://litipsum.com/)*
>"Lit Ipsum is a dummy text generator for web designers and developers. As an alternative to boring old Lorem Ipsum generators, it chooses passages from copyright-free literature courtesy of the Gutenberg Project. You can design using real English sentences."

## Installation

Install via npm:

```bash
% npm install react-lit-ipsum
```

## Usage

This library fetches placeholder text from [LitIpsum.com](https://litipsum.com/):

```jsx
import React from 'react';
import LitIpsum from 'react-lit-ipsum';  

class LitIpsumDemo extends React.Component {
  render() {
    return <LitIpsum />;
  }
}
```

## Configuration Options

You can pass the following props to the `LitIpsum` component:

1\. `paragraphs` : The number of paragraphs to be generated: `<LitIpsum paragraphs={3}/>`

2\. `book` : The literary work to use. Options are:

  * 'holmes' : *The Adventures of Sherlock Holmes* `<LitIpsum book={'holmes'}/>`
  
  * 'jekyll' : *Strange Case of Dr Jekyll and Mr Hyde* `<LitIpsum book={'jekyll'}/>`

  * 'dracula' : *Dracula* `<LitIpsum book={'dracula'}/>`
  
  * 'evalina' : *Evelina, or the History of a Young Lady's Entrance into the World* `<LitIpsum book={'evalina'}/>`
 
  * 'johnson' : *The Life of Samuel Johnson* `<LitIpsum book={'johnson'}/>`
  
  * 'dorian' : *The picture of Dorian Gray* `<LitIpsum book={'dorian'}/>`
  
  * 'pride' : *Pride and Prejudice* `<LitIpsum book={'pride'}/>`
  
3\. `id` : A string to identify a specific instance of the component for styling. (See 'Styling' below).

4\. `style` : An object of styles to be applied t the component. (See 'Styling' below).


## Styling

There are three ways to style the `LitIpsum` component:

1\. Use the 'lit-ipsum' class CSS selector:

``` css
.lit-ipsum {
    text-align: left;
    color: blue;
}
```

2\. Pass an 'id' prop to the component...

``` JSX
<LitIpsum id={'foo'}/>
```
...then use it as a CSS selector:
``` css
#foo {
    font-size: 22px;
}

```

3\. Pass a 'style' prop to the component:

``` JSX
<LitIpsum style={{color: 'red', fontFamily: 'Arial'}}/>
```


## Demo

Example code is located in the `demo` directory. To see it in action, clone this repository, cd to the directory of your cloned repository and run:

```bash
% npm install
% npm start
```

Then point your browser to: `http://localhost:8080/`.

## License

Released under The MIT License.*

MIT © [Rob Sheely](https://github.com/robsheely)


*Found a bug or an improvement? File an issue.
