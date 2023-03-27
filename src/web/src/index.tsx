import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router } from 'react-router-dom';
import './shared/translations/i18n/config';

// styles
import './index.css';

// compose
import ComponentCompose from './shared/composes/ComponentCompose/ComponentCompose';

// providers
import NetworkProvider from './shared/provider-context-hook/network/Network.provider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ComponentCompose components={[Router, NetworkProvider]}>
            <App />
        </ComponentCompose>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
