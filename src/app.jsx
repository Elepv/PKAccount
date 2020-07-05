import React from "react";

// 导入store和Provider
import store from "./redux/store";
import { Provider } from "react-redux";

// 导入组件
import PkNav from "./components/pk-nav";
// import Item from "./item";

// import AccountTable from "./account-table";

const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (err) {
      // ...错误处理
    }
}

// 页面刷新时存储state，但是和清除state冲突。
// window.onbeforeunload = (e) => {
//     const state = store.getState();
//     saveState(state);
// }

store.subscribe(() => {
    const state = store.getState();
    saveState(state);
})
  

function App() {

        return (
            <Provider store={store}>
                <div>
                    <PkNav />
                </div>
            </Provider>
        )
    
}

export default App