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