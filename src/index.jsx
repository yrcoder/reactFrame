import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'mobx-react';
import router from 'routers/router';
import stores from 'stores';
import 'styles/index.less';

const queryParams = queryString.parse(window.location.search);
const TOKEN = queryParams.token;
if (TOKEN) {
	sessionStorage.setItem('token', TOKEN);
}

ReactDOM.render(
	<Provider {...stores}>
		<BrowserRouter>{renderRoutes(router)}</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);
