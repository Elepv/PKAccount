import React, { Component } from "react"
import { connect } from "react-redux"

import Table from 'react-bootstrap/Table'

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
    
    handleChange = (name,returnnum) => {

        // 把余码用父组件的方法添加到userinfo中去，调用父组件中的方法
        this.setState({[name]: ( returnnum ? returnnum : 0 )})
        // this.setState({[name]: returnnum })
        var returnmsg = {
            name: name,
            ureturn: ( returnnum ? returnnum : 0 )
        }
        this.props.ureturnAction(returnmsg)
    }

    changeTotal = () => {
        // 计算会计合计
        const {userinfo} = this.props
        var acctotal = 0
        var contributiontotal = 0
        // var userstotal = 0
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
        payinfo.forEach((pelements) => {
            if (pelements.pname === "胜者支持") {
                pelements.pnum = contributiontotal
            }
            // if (pelements.pname == "参与者贡献") {
            //     pelements.pnum = parseInt(userstotal/4)
            // }
        })

        this.setState({ payinfo })
    }
    
    handlePayinfo = (payname,getval) => {

        const {payinfo} = this.state
        getval = getval*1

        payinfo.forEach((pelements) => {
            if (pelements.pname === payname) {
                if (pelements.type === "支出") {
                    pelements.pnum = -Math.abs( getval ? getval : 0 ) 
                } else if (pelements.type === "收入") {
                    pelements.pnum = ( getval ? getval : 0 )
                }
            }
            this.setState({ payinfo })
        })

        // 剩余公款的计算
        var fundtotal = 0
        payinfo.forEach((item,idx,payinfo) => {
            fundtotal += item.pnum
            this.setState({ fundtotal })
        })
    }

    render() {
        const {userinfo} = this.props
        const {payinfo} = this.state

        // 条件渲染
        var labelcontent = ""
        if (this.state.acctotal!==0) {
            labelcontent = "请核对"
        } else {
            labelcontent = "核对无误"
        }
        return(
            <div>

                {/* <div className="panel-heading mt-3 mx-1"><h5>汇总明细表</h5></div> */}

                <Table striped bordered hover size="sm" responsive="sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>称呼</th>
                            {/* <th>总拿码</th> */}
                            <th>合计</th>
                            <th>贡献</th>
                            <th className="table-danger">发放</th>
                            <th width="25%">退码</th>
                        </tr>    
                    </thead>
                    <tbody>
                        {
                            userinfo.map((elements,index) => {

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
                                        {/* <th>{ totalnum }</th> */}
                                        <th>{ restnum }</th>
                                        <th>{ contribution }</th>
                                        <th className="table-danger">{ income/4 }</th>
                                        <th><input
                                                type="text" 
                                                className="form-control  form-control-sm" 
                                                placeholder="余码" 
                                                value = { returnnum } 
                                                onChange = { (e) => {
                                                    this.handleChange(elements.name,e.target.value); 
                                                    this.changeTotal();
                                                }} 
                                            />
                                        </th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

                {/* 拿码退码核对部分 */}
                <div className="alert alert-dark pt-3" role="alert">
                    <h3><small className="mr-4">{ labelcontent }</small><span variant="badge badge-warning">{ this.state.acctotal }码</span></h3>
                </div>

                <div className="panel-heading mx-1"><h5>本场开支明细表</h5></div>

                <Table striped bordered hover size="sm">
                    <thead className="thead-dark">
                        <tr>
                            <th width="30%">明细</th>
                            <th width="30%">类型</th>
                            <th>金额</th>
                        </tr>    
                    </thead>
                    <tbody>
                    {
                        payinfo.map((elems,idx) => {

                            return( 
                                <tr key={idx}>
                                    <th>
                                        {elems.pname} 
                                        {/* <input type="text" className="form-control" id="disabledInput" placeholder="明细" value={ elems.pname } onChange={ (e) => {
                                            this.handlePayinfo(elems.pname);
                                            }} 
                                        /> */}
                                    </th>
                                    <th>
                                        {elems.type}
                                    </th>
                                    
                                    {/* <th><input type="number" className="form-control" placeholder="收入" value={ ppay } onChange={ (e) => {
                                            this.handlegaininfo(elems.pname);
                                            }} 
                                        />
                                    </th> */}
                                    <th><input type="number" className="form-control" placeholder="开支" value={ elems.pnum } onChange={ (e) => {
                                            this.handlePayinfo(elems.pname,e.target.value);
                                            }} 
                                        />
                                    </th>
                                    {/* <th><input type="text" className="form-control" placeholder="备注" value={ this.state.textinfo } onChange={ (e) => {
                                            this.handletextinfo(elems.pname);
                                            }} 
                                        />
                                    </th> */}
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>

                {/* 开支核对部分 */}
                <div className="alert alert-dark pt-3" role="alert">
                    <h3><small className="mr-4">公款余额</small><span variant="badge badge-success">{ this.state.fundtotal }元</span></h3>
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
