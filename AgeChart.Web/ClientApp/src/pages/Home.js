import React, { Component } from 'react';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';

export class Home extends Component {
    static displayName = Home.name;

    state = {
        people: [],
        showPie: true
    }

    componentDidMount = async () => {
        const { data } = await axios.get('/api/people/getpeople');
        await this.setState({ people: data });
    }

    togglePieChart = e => {
        this.setState({ showPie: !this.state.showPie })
    }

    getAgeCount = (min, max) => {
        return this.state.people.filter(p => p.age >= min && p.age <= max).length;
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.togglePieChart}>Toggle Pie Chart</button>
                {this.state.showPie &&
                    <div style={{ height: 200 }}>
                        <PieChart
                            data={[
                                { title: '1-10', value: this.getAgeCount(1, 10), color: '#E38627' },
                                { title: '11-20', value: this.getAgeCount(11, 20), color: '#C13C37' },
                                { title: '21-30', value: this.getAgeCount(21, 30), color: '#6A2135' },
                                { title: '31-40', value: this.getAgeCount(31, 40), color: '#b73ac3' },
                                { title: '41-50', value: this.getAgeCount(41, 50), color: '#764d45' },
                                { title: '51-60', value: this.getAgeCount(51, 60), color: '#a675ec' },
                                { title: '61-70', value: this.getAgeCount(61, 70), color: '#206d91' },
                                { title: '71-80', value: this.getAgeCount(71, 80), color: '#4afcd9' },
                                { title: '81-90', value: this.getAgeCount(81, 90), color: '#dbd264' },
                                { title: '91-100', value: this.getAgeCount(91, 100), color: '#7deb77' },
                                { title: '101-110', value: this.getAgeCount(101, 110), color: '#fffcca' },
                                { title: '111-120', value: this.getAgeCount(111, 120), color: '#296cd0' }
                            ]}
                            animate
                            totalValue={this.state.people.count}
                        />
                    </div>}
                {!!this.state.people &&
                    <table className="table table-bordered table-hover table-striped" style={{ marginTop: 40 }}>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.people.map(p =>
                                <tr key={p.id}>
                                    <td>{p.firstName}</td>
                                    <td>{p.lastName}</td>
                                    <td>{p.age}</td>
                                </tr>)}
                        </tbody>
                    </table>}
            </div>
        );
    }
}
