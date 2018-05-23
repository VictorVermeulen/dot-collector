import React, { Component } from 'react';
import firebase from './Firebase.js';
import Base from './css/Base.css';
import Grid from './css/Grid.css';
import Forms from './css/Forms.css';
import Dot from './Dot';

class App extends Component {

  constructor() {
    super();
    this.state = {
      dotType: 'Conflicted',
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
          title: dots[dot].dotType
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
    const dotsRef = firebase.database().ref('dots');
    const dot = {
      dotType: this.state.dotType
    }
    dotsRef.push(dot);
    this.setState({
      dotType: ''
    });
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
                      <option value="Conflicted">Conflicted</option>
                      <option value="Easy">Easy</option>
                      <option value="Sad">Sad</option>
                      <option value="Happy">Happy</option>
                      <option value="Fulfilled">Fulfilled</option>
                      <option value="Bored">Bored</option>
                    </select>
                  </label>
                  <button>Add dot</button>
                </form>
            </section>
            <section className='display-dot'>
              <div className="wrapper">
                <ul className="dot-list">
                  {this.state.dots.map(({ id, title }) => {
                    return (
                      <Dot title={title} id={id} removeDot={this.removeDot} />
                    )
                  })}
                </ul>
              </div>
            </section>
            <section className="col-12">
              <h3>Key</h3>
              <ul className="dot-list-key">
                <li className="Conflicted">Conflicted</li>
                <li className="Easy">Easy</li>
                <li className="Sad">Sad</li>
                <li className="Happy">Happy</li>
                <li className="Fulfilled">Fulfilled</li>
                <li className="Bored">Bored</li>
              </ul>
            </section>
          </div>
        </div>
    );
  }
}

export default App;
