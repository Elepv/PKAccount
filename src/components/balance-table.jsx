import React, { Component } from "react";

// import { connect } from "react-redux";

export default class BalanceTable extends Component {
    
    // status = this.props.status
    
    render() {
        return(
            <div>

                <div className="panel-heading mt-3 mx-1"><h5>汇总明细表</h5></div>

                <table striped bordered hover size="sm" responsive="sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>称呼</th>
                            <th>总拿码</th>
                            <th>合计码量</th>
                            <th>贡献值</th>
                            <th className="table-danger">发放</th>
                            <th width="25%">退码量</th>
                        </tr>    
                    </thead>
                    <tbody>
                        <tr>
                            <th>name</th>
                            <th>total</th>
                            <th>rest</th>
                            <th>contbt</th>
                            <th className="table-danger">income</th>
                            <th>
                                fafang
                                {/* <input type="text" className="form-control  form-control-sm" placeholder="余码"/> */}
                            </th>
                        </tr>
                    </tbody>
                </table>

                <div className="alert alert-dark pt-3" role="alert">
                    <h3><small className="mr-4">labelcontent</small><span variant="badge badge-warning">0码</span></h3>
                </div>

                <div className="panel-heading mx-1"><h5>本场开支明细表</h5></div>

                <table striped bordered hover size="sm">
                    <thead className="thead-dark">
                        <tr>
                            <th width="30%">明细</th>
                            <th width="30%">类型</th>
                            <th>金额</th>
                        </tr>    
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                mingxi1
                            </th>
                            <th>
                                leixing2
                            </th>
                            <th>
                                jine3
                                {/* <input type="number" className="form-control" placeholder="开支"/> */}
                            </th>
                        </tr>
                    </tbody>
                </table>

                <div className="alert alert-dark pt-3" role="alert">
                    <h3><small className="mr-4">公款余额</small><span variant="badge badge-success">0元</span></h3>
                </div>

            </div>
        )

    }
}

// const mapStateToProps = state => {
//     return state;
// };

// export default connect(mapStateToProps)(BalanceTable);
