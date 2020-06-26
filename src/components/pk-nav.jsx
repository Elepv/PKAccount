import React, { Component } from "react";

import Nav from 'react-bootstrap/Nav';

import MessageSent from "./message-sent";
import BalanceTable from './balance-table';


export default class PkNav extends Component {
    constructor(){
        super()
        this.state = {
            eventKey: "account"
        }
    }

    handleSelect = (eventKey) => {
        this.setState({ eventKey });
    };

    render() {

        let contentarr = null;
        if (this.state.eventKey === "account") {
            contentarr = <MessageSent />
        } else if (this.state.eventKey === "balance") {
            contentarr = <BalanceTable />
        }




        return (
            <div>
                {/* header nav */}
                <Nav variant="pills nav-fill my-3 mx-1" defaultActiveKey="account" onSelect={ (eventKey) => this.handleSelect(eventKey) }>
                    <Nav.Item>
                        <Nav.Link eventKey="account">记账</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="balance">数据汇总</Nav.Link>
                    </Nav.Item>
                </Nav>

                {/* body */}
                <div className="mt-1">{contentarr}</div>
                
            </div>
        );
    }
}
