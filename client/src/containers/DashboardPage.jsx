import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    let successMessage = '';

    // set the initial component state
    this.state = {
      secretData: '',
      errors: {},
      successMessage,
      lunch: {
        date: '',
        times: []
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeTimes = this.changeTimes.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    this.setState({
      successMessage: ''
    });

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/lunch');
    xhr.setRequestHeader('Content-Type', 'application/json');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        this.setState({
          successMessage: xhr.response.message
        });
      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(JSON.stringify(this.state.lunch));
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  changeDate(event, date) {
    var currLunch = this.state.lunch;
    currLunch.date = date;
    this.setState({
      lunch: currLunch
    });
    console.log(this.state)
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  changeTimes(event, isChecked) {
    var currLunch = this.state.lunch;
    var map = { 1: '11:00', 2: '12:30', 3: '2:00' }

    if (isChecked) {
      currLunch.times.push(map[event.target.id])
    } else {
      var filteredAry = currLunch.times.filter(function(e) {
        return e !== map[event.target.id]
      });
      currLunch.times = filteredAry;
    }

    this.setState({
      lunch: currLunch
    });

    console.log(this.state);
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message
        });
      }
    });
    xhr.send();
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <Dashboard 
        onSubmit={this.processForm} 
        secretData={this.state.secretData} 
        onChange={this.changeDate} 
        onCheck={this.changeTimes} 
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        lunch={this.state.lunch}
      />
    );
  }

}

export default DashboardPage;
