import {Menu, Sidebar} from "semantic-ui-react";
import React from "react";
import { initializeQuerySearch} from '../../actions';
import {connect} from "react-redux";
import {initialize} from "redux-form";
import moment from 'moment';

class VerticalSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    initializeInput = query => {
        this.props.initializeQuerySearch(query).then(() =>
            this.nameClicked(query)).then(() => this.props.handleFormSubmit({query}));
    };

    nameClicked = (query) => {
        this.props.initialize('syncValidation', {query});
    };
    render() {
        return (
            <Sidebar
                as={Menu}
                animation='slide out'
                direction='right'
                icon='labeled'
                inverted
                vertical
                visible={this.props.visible}
                width='very wide'
            >
                {this.props.pastQueries.length > 0 && this.props.pastQueries.map((query) => {
                    return <Menu.Item as='a' key={query.id} onClick={() => this.initializeInput(query.query)}>
                        {`${query.query}`}
                        {`   Query Time: ${moment.utc()}`}
                    </Menu.Item>
                } )}
            </Sidebar>
        )
    }
}

const mapStateToProps = state => {
    return {
        pastQueries: Object.values(state.results.pastQueries),
    };
};

export default connect(
    mapStateToProps,
    {initializeQuerySearch, initialize}
)(VerticalSidebar);
