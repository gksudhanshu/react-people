import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: 1,
      adults: 1,
      children: 0,
      isAdultsMaximum: false,
      isChildrenMaximum: false
    }
    this.getResult = this.getResult.bind(this);
  };

  getResult(val, type) {
    //console.log('onElement: ', val, ' action: ', type)
    //TODO write logic
    /**
     * Each of the + or - buttons can be clicked independent of the other (if enabled)
     * At no point of time can an invalid combination of data be possible in the UI
     * Rooms can be minimum 1 and maximum 5
     * of persons in each room (i.e. total of Adults and Children) can be minimum 1 and
     * maximum 4
     * #ofAdults can be>=1
     * of Children can be >= 0
     * #ofpersonscanbe>=#ofrooms
     * If room count is increased, the adult count can be increased to the extent required to meet the constraint
     * If room count is decreased, if # of persons exceed maximum allowed, first # of children can be reduced upto 0,
     *  if present; then # of adults can be reduced to the extent required to meet the constraint
     * - button should be disabled for room when 1 is the room count
     * f + button of room is clicked, room count should change from 1 to 2
     * If + button of room is clicked again, room count should change to 3 and the Adults count
     * should also change to 3
     * 
     */
    let values = this.state
    if (values.adults + values.children == 20) {
      values.isAdultsMaximum = true;
      values.isChildrenMaximum = true;
    }

    if (val === 'rooms') {
      values.isAdultsMaximum = false;
      values.isChildrenMaximum = false;
      if (type === 'minus') {


        values.rooms = values.rooms - 1;
        let difference = (values.adults + values.children) - (values.rooms) * 4
        if (difference > 0) {
          if (difference <= values.children) {
            values.children = values.children - difference;
          } else {
            values.children = 0
            let allowedPerson = difference - values.children;
            values.adults = values.adults - allowedPerson;
          }
        }
      } else {
        values.rooms = values.rooms + 1
        if (values.rooms > values.adults) {
          values.adults = values.adults + 1
        }
      }
    }


    else if (val === 'adults') {
      if (type === 'minus') {
        values.adults = values.adults - 1;
        values.isAdultsMaximum = false;
        values.isChildrenMaximum = false;
      } else {

        if (values.adults >= ((values.rooms * 4) - values.children)) {
          values.isAdultsMaximum = true;
        } else {
          values.adults = values.adults + 1
        }


      }
    }
    else {
      if (type === 'minus') {
        values.children = values.children - 1
        values.isAdultsMaximum = false;
        values.isChildrenMaximum = false;
      } else {
        if (values.adults >= ((values.rooms * 4) - values.children)) {
          values.isAdultsMaximum = true;
          values.isChildrenMaximum = true;

        } else {
          values.children = values.children + 1
        }

      }
    }

    this.setState({ rooms: values.rooms, adults: values.adults, children: values.children, isAdultsMaximum: values.isAdultsMaximum, isChildrenMaximum: values.isChildrenMaximum })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className="container col-md-6">
          <p> <i className="fa fa-users" aria-hidden="true"></i> Choose number of <b>people</b></p>
          <table className="table">
            <thead>
            </thead>
            <tbody>
              <tr>
                <td> <i className="fa fa-bed" aria-hidden="true"></i> ROOMS</td>
                <td>
                  <button className="button buttonminus" onClick={() => this.getResult('rooms', 'minus')} disabled={this.state.rooms <= 1}>-</button> &nbsp;
                   {this.state.rooms} &nbsp;
                  <button className="button buttonplus" onClick={() => this.getResult('rooms', 'plus')} disabled={this.state.rooms >= 5}>+</button>
                </td>
              </tr>
              <tr>
                <td><i className="fa fa-user" aria-hidden="true"></i> ADULTS</td>
                <td>
                  <button className="button buttonminus" onClick={() => this.getResult('adults', 'minus')} disabled={this.state.adults <= this.state.rooms}>-</button> &nbsp;
                  {this.state.adults} &nbsp;
                 <button className="button buttonplus" onClick={() => this.getResult('adults', 'plus')} disabled={this.state.isAdultsMaximum}>+</button>
                </td>
              </tr>
              <tr>
                <td><i className="fa fa-child" aria-hidden="true"></i> CHILDREN</td>
                <td>
                  <button className="button buttonminus" onClick={() => this.getResult('children', 'minus')} disabled={this.state.children <= 0}>-</button> &nbsp;
                  {this.state.children} &nbsp;
                  <button className="button buttonplus" onClick={() => this.getResult('children', 'plus')} disabled={this.state.isChildrenMaximum}>+</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
