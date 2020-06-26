import React, { Component } from "react";

import { connect } from "react-redux";
import Table from 'react-bootstrap/Table'

class AccountTable extends Component {

    // 没有实现idx！！！
    increasement = (name) => {
        var mymsg = {
            name: name,
            total: 1
        }
        this.props.modifyAction(mymsg)

    }

    decreasement = (name) => {
        var mymsg = {
            name: name,
            total: -1
        }
        this.props.modifyAction(mymsg)
    }
    
    render() {
        return(
            <div className="panel panel-default mt-3">

                <div className="table-responsive">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>称呼</th>
                                <th>总手数</th>
                                <th>编辑+1</th>
                                <th>编辑-1</th>
                            </tr>    
                        </thead>
                        <tbody>
                        {
                            this.props.userinfo.map((elements,index) => {
                                return(
                                    <tr key={index}>
                                        <th>{ elements.name }</th>
                                        <th>{ elements.total }</th>
                                        <th>
                                            <button type="button" className="btn btn-primary btn-sm"  onClick={ () => this.increasement(elements.name) }>
                                                增加
                                            </button>
                                        </th>
                                        <th>
                                            <button type="button" className="btn btn-info btn-sm" onClick={ () => this.decreasement(elements.name) }>
                                                减少
                                            </button>
                                        </th>
                                    </tr>
                                    
                                )
                                
                            })
                        }
                        </tbody>
                    </Table>
                </div>

            </div>
        )
    }
}

// 接收函数
const mapStateToProps = state => {
    return state
}

// 发送函数
const mapDispatchToProps = (dispatch) => {
    return {
        modifyAction: (mymsg) => {
            dispatch({
                type: 'modify',
                payload: mymsg
            })
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(AccountTable);
