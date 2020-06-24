import React, { Component } from "react";

// import { connect } from "react-redux";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Toast from 'react-bootstrap/Toast'

export default class MessageSent extends Component {
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
        const mymsg = this.noteInput.value
        // if(!mymsg){
        //     return
        // }
        // 将参数mymsg分割成数组
        const content = mymsg.split(/,|，|\s+/)

        if(content.length<2) {
            return
        }

        const {inputmsg} = this.state
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

        // 维护store中的主要的全局的属性。将inputmsg中的部分属性同步到store中去

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
        console.log(inputmsg)
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

// const mapStateToProps = state => {
//     return state
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         todo: () => {
//             dispatch({ type: "todo" });
//         },
//         stoptodo: () => {
//             dispatch({ type: "stoptodo" });
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MessageSent);
