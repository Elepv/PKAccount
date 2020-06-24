import React, { Component,useState } from "react";

import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MessageSent from "./message-sent";
import AccountTable from './account-table';
import BalanceTable from './balance-table';


export default class NavFooter extends Component {
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
            contentarr = [<MessageSent />, <AccountTable />]
        } else if (this.state.eventKey === "balance") {
            contentarr = <BalanceTable />
        }

        // switch (this.state.eventKey) {
        //     case "account":
        //         contentarr = [<AccountTable />]
        //         break;
        //     case "balance":
        //         contentarr = [<BalanceTable />]
        //         break;
        //     default:
        //         contentarr = "创建中..."
        // }

        function FooterModal() {
            const [show, setShow] = useState(false);
            const [lgShow, setLgShow] = useState(false);

            const handleClose = () => setShow(false);
            const handleLgClose = () => setLgShow(false);
            // const handleShow = () => setShow(true);

          
            return (
              <>
                <Button 
                    variant="btn btn-outline-warning my-1 mx-0 btn-lg"
                    onClick={() => setShow(true)}
                >
                    清除记录数据
                </Button>{' '}
                <Button 
                    variant="btn btn-outline-success float-right my-1 mx-0 btn-lg"
                    onClick={() => setLgShow(true)}
                >
                    保存本局数据
                </Button>

                <Modal
                  size="sm"
                  show={show}
                  onHide={() => setShow(false)}
                  aria-labelledby="contained-modal-title-vcenter-sm"
                  centered
                >
                    <Modal.Header>
                        <Modal.Title id="example-modal-sizes-title-sm">
                            是否清除缓存数据
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>缓存数据可以暂时保存你之前的数据，不会因为退出或者刷新造成之间记录的数据丢失。</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={handleClose}>
                            确认清除！
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="contained-modal-title-vcenter-lg"
                    centered
                >
                    <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        是否保存
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>...</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleLgClose}>
                            Close
                        </Button>
                        <Button variant="success" onClick={handleLgClose}>
                            确认保存
                        </Button>
                    </Modal.Footer>
                </Modal>
              </>
            );
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
                
                {/* footer */}
                <div className="mb-5 mx-1">
                    <FooterModal />
                </div>
            </div>
        );
    }
}
