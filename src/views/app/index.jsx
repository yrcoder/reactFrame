import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Avatar, Icon, Menu } from 'antd';
import menus from 'routers/menus';
import logo from '../../images/logo.png';
import 'styles/pages/app.less';

const { SubMenu } = Menu;
@inject('commonStore')
@observer
class App extends Component {
	state = {
		current: '/',
	};

	componentDidMount() {
		this.setState(
			{
				current: menus[0].subMenu[0].path,
			},
			() => {
				this.props.history.push(menus[0].subMenu[0].path);
			},
		);
	}

	switchNavMenu = ({ key }) => {
		if (key === 'logout') {
			console.log('退出登录');
		}
	};

	toRouter = (e) => {
		console.log(e);
		this.props.history.push(e.key);
		this.setState({
			current: e.key,
		});
	};

	render() {
		const { route } = this.props;
		const { current } = this.state;
		return (
			<div className="app">
				<header className="app-header">
					<div className="app-header-left">
						<img src={logo} alt="LOGO" />
						<h1 className="logo-text">ABCDEFG</h1>
					</div>
					<Menu
						mode="horizontal"
						onClick={this.switchNavMenu}
						className="app-header-right"
					>
						<SubMenu
							title={(
<div className="app-header-user">
									<Avatar icon="user" />
									<span className="username">张三</span>
</div>
)}
						>
							<Menu.Item key="logout">
								<Icon type="logout" />
								退出登录
							</Menu.Item>
						</SubMenu>
					</Menu>
				</header>
				<div className="app-content">
					<Menu
						className="app-nav"
						defaultSelectedKeys={[menus[0].subMenu[0].path]}
						defaultOpenKeys={[menus[0].path]}
						mode="inline"
						theme="dark"
						selectedKeys={[current]}
						onClick={this.toRouter}
					>
						{menus.map(subMenu => (
							<SubMenu
								key={subMenu.path}
								title={(
<span>
										<span>{subMenu.title}</span>
</span>
)}
							>
								{subMenu.subMenu
									? subMenu.subMenu.map(item => (
											<Menu.Item key={item.path}>{item.title}</Menu.Item>
									  ))
									: ''}
							</SubMenu>
						))}
					</Menu>
					<main className="app-main">{renderRoutes(route.routes)}</main>
				</div>
			</div>
		);
	}
}

export default withRouter(App);
