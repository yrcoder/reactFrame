import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('commonStore')
@observer
class Home extends Component {
	render() {
		return <div>Home</div>;
	}
}

export default Home;
