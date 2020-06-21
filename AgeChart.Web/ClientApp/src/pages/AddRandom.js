import React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';

class AddRandom extends React.Component {

    state = {
        chosenAmount: 0,
        ageRange: [1, 120],
        min: 1,
        max: 120
    }

    changeAmount = value => {
        this.setState({ chosenAmount: value });
    }

    changeAgeRange = value => {
        this.setState({ ageRange: value });
    }

    addPeople = async () => {
        const { chosenAmount, ageRange } = this.state;
        await axios.post('/api/people/addrandompeople', { amount: chosenAmount, min: ageRange[0], max: ageRange[1] });
        this.setState({ chosenAmount: 0, ageRange: [1, 120], min: 1, max: 120 });
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="row" style={{ marginTop: 40 }}>
                <div className="col-md-6 col-md-offset-3 well">
                    <h3>How many people would you like added?</h3>
                    <span>You chose: {this.state.chosenAmount}<Slider
                        style={{ width: 500 }}
                        defaultValue={this.state.chosenAmount}
                        value={this.state.chosenAmount}
                        onChange={this.changeAmount}
                        min={0}
                        max={50}
                        included
                    /></span>
                    <h3>Choose an age range:</h3>
                    <span>You chose: {this.state.ageRange[0]} - {this.state.ageRange[1]}
                        <Range
                            style={{ width: 500 }}
                            defaultValue={[1, 120]}
                            value={this.state.ageRange}
                            onChange={this.changeAgeRange}
                            min={this.state.min}
                            max={this.state.max}
                            included
                        />
                    </span>
                    <br />
                    <button onClick={this.addPeople} className="btn btn-block btn-success">Add People</button>
                </div>
            </div>
        );
    }
}

export default AddRandom;