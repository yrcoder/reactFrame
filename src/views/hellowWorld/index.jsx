import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import viewPage from 'decorator/viewPage';

@viewPage({ permissionCode: '/helloWorld' })
@inject('commonStore')
@observer
class HellowWorld extends Component {
	render() {
		return <div>hellowWorld</div>;
	}
}

export default HellowWorld;
