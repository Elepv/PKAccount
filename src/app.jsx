import React from "react";

// 导入store和Provider
import store from "./redux/store";
import { Provider } from "react-redux";

// 导入组件
import NavFooter from "./components/navfooter";
// import Item from "./item";

// import AccountTable from "./account-table";

function App() {

        return (
            <Provider store={store}>
                <div>
                    <div>hello,react</div>
                    <NavFooter />
                </div>
            </Provider>
        )
    
}

export default App