import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

class AddPerson extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        birthday: ''
    }

    onComponentDidMount = () => {
        this.setState({ birthday: new Date() });
    }

    onDateChange = date => {
        this.setState({ birthday: date });
    }

    onFirstNameTextChange = e => {
        this.setState({ firstName: e.target.value })
    }

    onLastNameTextChange = e => {
        this.setState({ lastName: e.target.value })
    }

    onAddClick = async e => {
        const { firstName, lastName, birthday } = this.state;
        await axios.post('/api/people/addperson', { firstName, lastName, birthday });
        this.setState({ firstName: '', lastName: '', birthday: '' });
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="row" style={{ marginTop: 40 }}>
                <div className="col-md-6 col-md-offset-3 well">
                    <h3>Add a Person:</h3>
                    <input type="text" className="form-control" placeholder="First Name" defaultValue={this.state.firstName} onChange={this.onFirstNameTextChange} />
                    <br />
                    <input type="text" className="form-control" placeholder="Last Name" defaultValue={this.state.lastName} onChange={this.onLastNameTextChange} />
                    <br />
                    <span>Birthday <DatePicker
                        onChange={this.onDateChange}
                        selected={this.state.birthday}
                        className="form-control"
                        defaultValue={this.state.birthday} />
                    </span>
                    <br />
                    <br />
                    <button onClick={this.onAddClick} className="btn btn-block btn-success">Add Person</button>
                </div>
            </div>
        );
    }

}

export default AddPerson;