import React from "react";
import { ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { enableMapSet } from "immer";
import configureStore from "./store/configure_store";
import loadInitialData from "./store/load_initial_data";
import apolloClient from "./graphql/apollo_client";
import "./index.css";
import App from "./App";
import App2 from "./App2";

const { store, persistor } = configureStore();
loadInitialData(store, apolloClient);
//loadInitialData(store);

enableMapSet();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App2 />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
