import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: ''
    };
    this.processDashBoardForm = this.processDashBoardForm.bind(this);
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
     * Post lunch's date and time
     * @param event
     */
    processDashBoardForm(event) {

        event.preventDefault();

        const date = event.target.date;
        const time = event.target.times;
        const formData = `date=${date}&times=${time}`;

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/lunch');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', function () {
            if (xhr.status === 200) {
                this.setState({
                    secretData: xhr.response.message
                });
            }
        });
        xhr.send(formData);
    }

  /**
   * Render the component.
   */
  render() {
    return (<Dashboard secretData={this.state.secretData} onSumbit={this.processDashBoardForm} />);
  }

}

export default DashboardPage;
