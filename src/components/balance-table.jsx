import React, { Component } from "react"

import { connect } from "react-redux"

import FooterModal from "./pk-footer"

class BalanceTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            acctotal: 0,
            fundtotol: 0,
            payinfo: [
                {
                    pname: "胜者支持",
                    type: "收入",
                    pnum: 0,
                },
                {
                    pname: "参与者贡献",
                    type: "收入",
                    pnum: 0,
                },
                {
                    pname: "记账",
                    type: "支出",
                    pnum: -300,
                },
                {
                    pname: "发牌算账",
                    type: "支出",
                    pnum: -450,
                },
                {
                    pname: "场地费",
                    type: "支出",
                    pnum: 0,
                },
                {
                    pname: "夜宵",
                    type: "支出",
                    pnum: 0,
                },
                {
                    pname: "奶茶",
                    type: "支出",
                    pnum: 0,
                },
                {
                    pname: "聚餐",
                    type: "支出",
                    pnum: 0,
                },
                {
                    pname: "其他支出1",
                    type: "支出",
                    pnum: 0,
                },
                {
                    pname: "其他支出2",
                    type: "支出",
                    pnum: 0,
                },
                {
                    pname: "其他支出3",
                    type: "支出",
                    pnum: 0,
                },
                {
                    pname: "其他收益",
                    type: "收入",
                    pnum: 0,
                }
            ]
        }
    }
    
    handleChange = (e,name,totalnum) => {

        const returnnum = e.target.value
        console.log(e.target)

        // 把余码用父组件的方法添加到userinfo中去，调用父组件中的方法
        this.setState({[name]: ( returnnum ? returnnum : 0 )})
        // this.setState({[name]: returnnum })
        var returnmsg = {
            name: [name],
            ureturn: ( returnnum ? returnnum : 0 )
        }
        this.props.ureturnAction(returnmsg)
    }

    changeTotal = () => {
        // 计算会计合计
        const {userinfo} = this.props
        var acctotal = 0
        var contributiontotal = 0
        var userstotal = 0
        userinfo.forEach((item,idx,userinfo) => {
            acctotal += (item.ureturn - item.total*1000)

            if (item.name !== "发牌" && item.name !== "贡献") {
                if ((item.ureturn - item.total*1000)>0) {
                    contributiontotal += parseInt((item.ureturn - item.total*1000)*0.1)
                }
            }

            // if (item.name = "贡献") {
            //     userstotal = item.ureturn
            // }
        })
        this.setState({acctotal})

        const {payinfo} = this.state
        payinfo.map((pelements,pidx) => {
            if (pelements.pname === "胜者支持") {
                pelements.pnum = contributiontotal
            }
            // if (pelements.pname == "参与者贡献") {
            //     pelements.pnum = parseInt(userstotal/4)
            // }
        })

        this.setState({ payinfo })
    }
    
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
                        {
                            this.props.userinfo.map((elements,index) => {

                                // 退码量，调用父组件传来的参数，显示在input中和它联动
                                var returnnum = elements.ureturn

                                var totalnum = elements.total*1000
                                var restnum = returnnum - totalnum
                                var contribution = 0*1
                                if (elements.name !== "发牌" && elements.name !== "贡献") {
                                    if (restnum>0) {
                                        contribution = parseInt(restnum*0.1)
                                    }
                                }
                                var income = restnum - contribution

                                return(
                                    <tr key={index}>
                                        <th>{ elements.name }</th>
                                        <th>{ totalnum }</th>
                                        <th>{ restnum }</th>
                                        <th>{ contribution }</th>
                                        <th className="table-danger">{ income/4 }</th>
                                        <th><input
                                                type="text" 
                                                className="form-control  form-control-sm" 
                                                placeholder="余码" 
                                                value = { returnnum } 
                                                onChange = { (e) => {
                                                    this.handleChange(elements.name,totalnum); 
                                                    this.changeTotal();
                                                }} 
                                            />
                                        </th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                {/* 拿码退码核对部分 */}
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

                {/* 开支核对部分 */}
                <div className="alert alert-dark pt-3" role="alert">
                    <h3><small className="mr-4">公款余额</small><span variant="badge badge-success">0元</span></h3>
                </div>

                {/* footer */}
                <div className="mb-5 mx-1">
                    <FooterModal />
                </div>
            </div>
        )

    }
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        ureturnAction: (returnmsg) => {
            dispatch({
                type: 'ureturn',
                payload: returnmsg
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BalanceTable);
