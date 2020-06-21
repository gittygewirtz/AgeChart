import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import { Home } from './pages/Home';
import AddPerson from './pages/AddPerson';
import AddRandom from './pages/AddRandom';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route exact path='/addperson' component={AddPerson} />
                <Route exact path='/addrandom' component={AddRandom} />
            </Layout>
        );
    }
}
