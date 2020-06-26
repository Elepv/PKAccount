import React, { Component } from "react";

import { connect } from "react-redux";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Toast from 'react-bootstrap/Toast'

import AccountTable from './account-table';

class MessageSent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isshow: false,

            inputmsg: [
                {   
                    msg: "开始请输入名字，用逗号隔开，默认都是一手",
                    time: new Date().toLocaleTimeString(),
                    name: "***",
                    num: 0
                },
            ],
        }

    }

    // componentWillMount() {
    //     const {inputmsg} = this.state
    //     var ipmsg = JSON.parse(localStorage.getItem("inputmsg_json"))

    //     if (ipmsg) {
    //         this.setState({
    //             inputmsg: ipmsg
    //         })
    //     }
    // }

    // handler = () => {
    //     this.props.todo();
    //     this.props.stoptodo();
    // };


    // store的dispatch的三种方式：
    // 1. 增加。 2. 撤回。 3. 删除


 
    handleClick = () => {
        const {userinfo} = this.props
        const {inputmsg} = this.state
        const mymsg = this.noteInput.value
        // if(!mymsg){
        //     return
        // }

        // 将参数mymsg分割成数组
        const content = mymsg.split(/,|，|\s+/)

        if(content.length<2) {
            return
        }

        var mymsgarr = {
            msg: mymsg,
            time: new Date().toLocaleTimeString(),
            name: content[0],
            num: parseInt(content[1])
        }
        inputmsg.unshift(mymsgarr)
        this.setState({inputmsg})

        var jsonipmsg = JSON.stringify(inputmsg)
        localStorage.setItem("inputmsg_json",jsonipmsg)

        this.noteInput.value = ""

        // 将数据分类，根据情况发送给reducer
        var sentmsg = {}
        var pnum = content[1].replace(/[^0-9]/ig,"")

        if (pnum) {
            for (let i in userinfo) {
                if (userinfo[i].name === content[0]) {
                    sentmsg = {
                        name: userinfo[i].name,
                        total: parseInt(pnum)
                    }
                    this.props.modifyAction(sentmsg)
                } 
            }
            sentmsg = {
                name: content[0],
                total: parseInt(pnum)
            }
            this.props.modifyAction(sentmsg)
        } else {
            for (var i = 0; i < content.length; i++) {
                for (let j in userinfo) {
                    if (userinfo[j].name === content[i]) {
                        sentmsg = {
                            name: userinfo[j].name,
                            total: userinfo[j].total += 1
                        }
                    } else {
                        continue
                    }
                    sentmsg = {
                        name: content[i],
                        total: 1
                    }

                    this.props.modifyAction(sentmsg)
                }
            }
        }




        // 维护store中的主要的全局的属性。将inputmsg中的部分属性同步到store中去

        // 事先构造一个插入到state中的对象
        // var note = {name: content[0], total: parseInt(content[1])}

        // var flag = true

        // 将发送来的参数mymsg历遍，和state中的数据进行对比，如何名字相符，则改变对应的total中的数据
        // 该state的数据是state1 ，每次提交，得到一个新的state数据
        // for(var i = 0; i < content.length; i++) {
        //     userinfo.map((elements) => {
        //         if (elements.name === content[i]) {
        //             if (parseInt(content[1].replace(/[^0-9]/ig,""))) {
        //                 elements.total += parseInt(content[1].replace(/[^\d|^\-]/g,""))
        //             } else {
        //                 elements.total += 1 
        //             }
        //             var sendmymsg = {
        //                 name: elements.name,
        //                 num: elements.total
        //             }
        //             this.props.modifyAction(sendmymsg)
        //             // flag = false
        //         }
        //     })
        // }

        // if (flag) {
        //     userinfo.unshift(note) 
        // }

        // this.setState({userinfo})

        // var jsoncontent = JSON.stringify(userinfo)
        // localStorage.setItem("userinfo_json",jsoncontent)

        //   var blob = new Blob([jsoncontent], {type: "text/plain;charset=utf-8"})
        //   saveAs(blob, "pokerdata.json")
    }
    

    onkeydown = (e) => {
        if (e.keyCode === 13){
            this.handleClick()
            this.noteInput.value = ""
        }
    }

    handleClose = (idx) => {
        const {inputmsg} = this.state
        inputmsg.splice(idx, 1)
        this.setState({inputmsg})
    }


    toggleCloseButton = () => {
        const {showCloseButton} = this.state
        if (showCloseButton) {
            this.setState({isshow: false})
        } else {
            this.setState({isshow: true})
            window.setTimeout(() => { 
                this.setState({showCloseButton: false},
                window.location.reload()
            )},
            6000)
        }

        // 维护store中全局的属性。将inputmsg中的数据同步到store中 

    }



    render() {
        const {inputmsg} = this.state

        return(
            <div className = "my-3">
                <InputGroup>
                    <FormControl
                        placeholder="姓名，几手，被谁打光 or 余码几手"
                        aria-label="sentmsg"
                        aria-describedby="sentmsg"
                        ref={input => this.noteInput = input} 
                        onKeyDown={ (e) => this.onkeydown(e) }                
                    />
                    <InputGroup.Append>
                        <Button variant="outline-success" onClick={this.handleClick}>发送</Button>
                        <DropdownButton
                            as={InputGroup.Append}
                            variant="outline-success"
                            title=""
                            id="input-group-dropdown-2"
                            size="sm"
                        >
                            <Dropdown.Item href="#">撤销</Dropdown.Item>
                            <Dropdown.Item onClick={ this.toggleCloseButton }>编辑</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#">备用2</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup.Append>
                </InputGroup>

                <AccountTable />

                <div className="mx-2 mt-1">
                {
                    
                    inputmsg.map((elements,idx) => {
                        return(
                            <Toast
                                key={idx} 
                                onClose={ (idx) => this.handleClose(idx) }
                            >
                                <Toast.Header closeButton = { this.state.isshow } >
                                    <strong className="mr-auto">{elements.name}</strong>
                                    <small>{elements.time}</small>
                                </Toast.Header>
                                <Toast.Body>{elements.msg}</Toast.Body>
                            </Toast>
                        )
                    })
                }
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

function mapDispatchToProps (dispatch) {
    return {
        modifyAction: (mymsg) => dispatch({
                type: 'modify',
                payload: mymsg
            })
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageSent);
