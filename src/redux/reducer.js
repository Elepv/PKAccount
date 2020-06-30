/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */

const initState = {
    userinfo: [
        {   name: "大体",
            total: 0,
            ureturn: ""
        },
        {   name: "和尚",
            total: 0,
            ureturn: ""
        },  
        {   name: "冒冒",
            total: 0,
            ureturn: ""
        },
        {   name: "大局",
            total: 0,
            ureturn: ""
        },
        {   name: "阿辉",
            total: 0,
            ureturn: ""
        },
        {   name: "会长",
            total: 0,
            ureturn: ""
        },
        {   name: "小施",
            total: 0,
            ureturn: ""
        },
        {   name: "jj",
            total: 0,
            ureturn: ""
        },
        {   name: "曹老板",
            total: 0,
            ureturn: ""
        },
        {   name: "娜娜",
            total: 0,
            ureturn: ""
        },
        {   name: "小明",
            total: 0,
            ureturn: ""
        },
        {   name: "八戒",
            total: 0,
            ureturn: ""
        },
        {   name: "潘老板",
            total: 0,
            ureturn: ""
        },
        {   name: "发牌",
            total: 0,
            ureturn: ""
        },
        {   name: "贡献",
            total: 0,
            ureturn: ""
        }
    ]
    // date: new Date().toLocaleTimeString(),
    // indexactived: true
}

exports.submitMsg = (state = initState, action) => {

    switch(action.type) {
        // case "add":
        //     return state

        case "modify":
            var newState = JSON.parse(JSON.stringify(state)); 
            var flag = true
            for (var i in newState.userinfo) {
                if (newState.userinfo[i].name === action.payload.name) {
                    newState.userinfo[i].total += action.payload.total
                    flag = false
                } 
            }
            if (flag) {
                newState.userinfo.unshift({
                    name: action.payload.name,
                    total: action.payload.total
                })
            }
            return newState

        case "ureturn":
            var newStateU = JSON.parse(JSON.stringify(state)); 
            for (var j in newStateU.userinfo) {
                if (newStateU.userinfo[j].name === action.payload.name) {
                    newStateU.userinfo[j].ureturn = action.payload.ureturn*1
                }
            }
            return newStateU
            
        default:
            return state
    }
}


    // // 将文本输入框中提交的数据加入到state中去
    // addTo = (mymsg) => {
    //     // 将传来的参数mymsg分割成数组
    //     const content = mymsg.split(/,|，|\s+/);

    //     // 事先构造一个插入到state中的对象
    //     var note = { name: content[0], total: parseInt(content[1]) };

    //     // 设置两个变量
    //     const { userinfo } = this.state;
    //     var flag = true;

    //     // 将发送来的参数mymsg历遍，和state中的数据进行对比，如何名字相符，则改变对应的total中的数据
    //     // 该state的数据是state1 ，每次提交，得到一个新的state数据
    //     for (var i = 0; i < content.length; i++) {
    //         userinfo.map((elements, index) => {
    //             if (elements.name == content[i]) {
    //                 if (parseInt(content[1].replace(/[^0-9]/gi, ""))) {
    //                     elements.total += parseInt(
    //                         content[1].replace(/[^\d|^\-]/g, "")
    //                     );
    //                 } else {
    //                     elements.total += 1;
    //                 }
    //                 var flag = false;
    //             }
    //         });
    //     }

    //     if (flag) {
    //         userinfo.unshift(note);
    //     }

    //     this.setState({ userinfo });

    //     var jsoncontent = JSON.stringify(userinfo);
    //     localStorage.setItem("userinfo_json", jsoncontent);

    //     //   var blob = new Blob([jsoncontent], {type: "text/plain;charset=utf-8"})
    //     //   saveAs(blob, "pokerdata.json")
    // };

    // addReturn = (name, returnnum) => {
    //     const { userinfo } = this.state;

    //     userinfo.map((elements, index) => {
    //         if (elements.name === name) {
    //             elements.ureturn = returnnum * 1;
    //         }
    //     });
    // };

    // resetuserinfo = () => {
    //     localStorage.clear();
    //     window.location.reload();
    // };

    // indexdeactive = () => {
    //     this.setState({
    //         indexactived: false,
    //     });
    // };

    // indexactive = () => {
    //     this.setState({
    //         indexactived: true,
    //     });
    // };
