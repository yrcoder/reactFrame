// import 'styles/pages/login.less';

import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'mobx-react';
import router from 'routers/router';
import CommonStore from 'stores/commonStore';

const queryParams = queryString.parse(window.location.search);
const TOKEN = queryParams.token;
if (TOKEN) {
	sessionStorage.setItem('Authorization', TOKEN);
}

window.__INITIAL_STATE__ = {};

const createStores = state => ({
	commonStore: new CommonStore(state),
});

const stores = createStores(window.__INITIAL_STATE__);

ReactDOM.render(
	<Provider {...stores}>
		<BrowserRouter>{renderRoutes(router)}</BrowserRouter>
	</Provider>,
	document.getElementById('app'),
);
