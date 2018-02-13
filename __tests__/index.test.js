'use strict';

import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import FetchMock from 'jest-fetch-mock';

import LitIpsum from '../src/index';

const LIT_IPSUM_URL = 'https://litipsum.com/api/';
const BOOKS = {
  holmes: 'adventures-sherlock-holmes',
  jekyll: 'dr-jekyll-and-mr-hyde',
  dracula: 'dracula',
  evelina: 'evelina',
  johnson: 'life-of-samuel-johnson',
  dorian: 'picture-of-dorian-gray',
  pride: 'pride-and-prejudice'
};

const DUMMY_RESPONSE = JSON.stringify({
	title: "Dracula",
	slug: "dracula",
	length: 4,
	text: ["Paragraph1", "Paragraph2", "Paragraph3"]
});

Enzyme.configure({adapter: new Adapter()});
global.fetch = FetchMock;

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(DUMMY_RESPONSE);
});


it('can be selected by class', () => {
  const wrapper = mount(<LitIpsum/>);
  const ipsumNode = wrapper.find('.lit-ipsum');

  expect(ipsumNode.exists()).toEqual(true);
});

it('can be selected by id', () => {
  const wrapper = mount(<LitIpsum id={'foo'}/>);
  const ipsumNode = wrapper.find('#foo');

  expect(ipsumNode.exists()).toEqual(true);
});

it('calls correct default url', () => {
  mount(<LitIpsum/>);
  expect(fetch).toHaveBeenCalledWith(LIT_IPSUM_URL + 'json');
});

it('calls correct url with book prop provided', () => {
  for (let key in BOOKS) {
    mount(<LitIpsum book={key}/>);
    expect(fetch).toHaveBeenCalledWith(LIT_IPSUM_URL + BOOKS[key] + '/json');
  }
});

it('calls correct url with paragraphs prop provided', () => {
  mount(<LitIpsum paragraphs={3}/>);
  expect(fetch).toHaveBeenCalledWith(LIT_IPSUM_URL + '3/json');
});

it('calls correct url with book and paragraphs props provided', () => {
  mount(<LitIpsum book={'johnson'} paragraphs={3}/>);
  expect(fetch).toHaveBeenCalledWith(LIT_IPSUM_URL + 'life-of-samuel-johnson/3/json');
});

it('calls correct url with invalid book prop provided', () => {
  mount(<LitIpsum book={'foo'}/>);
  expect(fetch).toHaveBeenCalledWith(LIT_IPSUM_URL + 'json');
});

it('calls correct url with non-integer paragraphs prop provided', () => {
  mount(<LitIpsum paragraphs={3.4}/>);
  expect(fetch).toHaveBeenCalledWith(LIT_IPSUM_URL + '3/json');
});

it('sets style from style props', () => {
  const wrapper = mount(<LitIpsum style={{color: 'red', fontSize: 22}}/>);
  const ipsumNode = wrapper.find('.lit-ipsum');

  expect(ipsumNode.instance().style.color).toEqual('red');
  expect(ipsumNode.instance().style.fontSize).toEqual('22px');
});

it('renders initial state', () => {
  const wrapper = mount(<LitIpsum/>);
  const ipsumNode = wrapper.find('.lit-ipsum');

  expect(ipsumNode.html()).toEqual('<div class="lit-ipsum"><p>loading...</p></div>');
});

it('renders fetched state', () => {
  const wrapper = mount(<LitIpsum/>);

  wrapper.instance().componentDidUpdate = () => {
    const ipsumNode = wrapper.find('.lit-ipsum');
    expect(ipsumNode.html()).toEqual('<div class="lit-ipsum"><p>Paragraph1</p><p>Paragraph2</p><p>Paragraph3</p></div>');
  }
});

it('handles status 400', () => {
  fetch.mockResponse('Paragraph1', {'status': 400});

  const wrapper = mount(<LitIpsum/>);
  wrapper.instance().componentDidUpdate = () => {
    const ipsumNode = wrapper.find('.lit-ipsum');
    expect(ipsumNode.html()).toEqual('<div class="lit-ipsum"><p>Error: Bad Request</p></div>');
  }
});

it('handles unknown error', () => {
  fetch.mockReject(new Error('foo'));

  const wrapper = mount(<LitIpsum/>);
  wrapper.instance().componentDidUpdate = () => {
    const ipsumNode = wrapper.find('.lit-ipsum');
    expect(ipsumNode.html()).toEqual('<div class="lit-ipsum"><p>Error: foo</p></div>');
  }
});
