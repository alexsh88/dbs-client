import React from 'react';
import { Router, Route } from 'react-router-dom';
import QueryCreate from './queries/QueryCreate';
import ResultList from './queries/ResultList';
import history from '../history';

import {connect} from "react-redux";



class App extends React.Component {

    render() {
        return (
            <div>
                <div className="ui container">
                    <Router history={history}>
                        <div>
                            <Route path="/" exact component={QueryCreate} />
                            {/*<Route path="/" exact component={StreamForm} />*/}
                            <Route path="/" exact component={ResultList} />
                            {/*<Route path="/streams/edit/:id" exact component={StreamEdit} />*/}
                            {/*<Route path="/streams/delete" exact component={StreamDelete} />*/}
                            {/*<Route path="/streams/show" exact component={StreamShow} />*/}
                        </div>
                    </Router>
                </div>

            </div>
        )
    }
}





export default connect(
    // mapStateToProps,
)(App);
