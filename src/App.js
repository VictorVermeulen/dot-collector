import React, { Component } from 'react';
import firebase from './Firebase.js';
import Base from './css/Base.css';
import Grid from './css/Grid.css';
import Forms from './css/Forms.css';
import Dot from './Dot';
import DotList from './DotList';
import dotTypes from './dot-types';

class App extends Component {

  constructor() {
    super();
    this.state = {
      dotType: '',
      dots: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const dotsRef = firebase.database().ref('dots');
    dotsRef.on('value', (snapshot) => {
      let dots = snapshot.val();
      let newState = [];
      for (let dot in dots) {
        newState.push({
          id: dot,
          type: dots[dot].dotType
        });
      }
      this.setState({
        dots: newState
      });
    });
  }

  removeDot(dotId) {
    const dotRef = firebase.database().ref(`/dots/${dotId}`);
    dotRef.remove();
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.dotType !== '') {
      const dotsRef = firebase.database().ref('dots');
      const dot = {
        dotType: this.state.dotType,
        timestamp: new Date(),
      }
      dotsRef.push(dot);
      this.setState({
        dotType: ''
      });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className='container'>
          <header className="row">
            <h1>Dot Collector</h1>
            <p className="lead">
              "A quick demo of using Firebase with Ray Dalio's Dot Tracker concept"
            </p>
          </header>
          <div className='row'>
            <section className='add-dot col-12'>
                <form onSubmit={this.handleSubmit}>
                  <label for="dotType">
                    How are you feeling?:
                    <select name="dotType" onChange={this.handleChange} value={this.state.dotType}>
                      <option value="">SELECT A TYPE</option>
                      {dotTypes.map(({ label }) => <option value={label}>{label.toUpperCase()}</option>)}
                    </select>
                  </label>
                  <button>Add dot</button>
                </form>
            </section>
            <section className='display-dot'>
              <div className="wrapper">
                <DotList>
                  {this.state.dots.map(({ id, type }) => {
                    return (
                      <Dot type={type} id={id} removeDot={this.removeDot} />
                    )
                  })}
                </DotList>
              </div>
            </section>
          </div>
        </div>
    );
  }
}

export default App;
