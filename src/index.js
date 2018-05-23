import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Merriweather:300,300i,700,900', 'sans-serif']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
