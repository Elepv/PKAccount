import React from "react";

// 导入store和Provider
import store from "./redux/store";
import { Provider } from "react-redux";

// 导入组件
import PkNav from "./components/pk-nav";
// import Item from "./item";

// import AccountTable from "./account-table";

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