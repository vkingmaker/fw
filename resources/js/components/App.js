import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./Home";
import BookDetails from "./Book-details";
import Layout from "./Layout";
import store from "../redux/store";

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Layout>
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/book/:id" component={BookDetails} exact />
                    </Switch>
                </Layout>
            </Provider>
        </BrowserRouter>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
