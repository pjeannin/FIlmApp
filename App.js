import React from 'react';
import Navigation from "./Navigation/Navigation";
import Store from "./Store/ConfigureStore.js"
import { Provider} from "react-redux";

export default function App() {
    return (
        <Provider store={Store}>
            <Navigation/>
        </Provider>
    );
}