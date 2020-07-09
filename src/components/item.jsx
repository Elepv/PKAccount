import React, { Component } from "react";
import { connect } from "react-redux";

import api from '../api';
class Item extends Component {
    api.login
    render() {
        return <div>nav</div>;
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (action) => {
    const mapDispatchToProps = (dispatch) => {
        return {
            todo: () => {
                dispatch({ type: "todo" });
            },
            stoptodo: () => {
                dispatch({ type: "stoptodo" });
            },
        };
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
