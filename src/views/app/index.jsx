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
		selectedKeys: [],
		firstMenu: '',
	};

	componentDidMount() {
		const firstMenu = menus[0].subMenu[0].path;
		this.setState(
			{
				firstMenu,
			},
			() => {
				this.setSelectedKeys(firstMenu);
			},
		);
	}

	/**
	 * header
	 */

	switchNavMenu = ({ key }) => {
		if (key === 'logout') {
			console.log('退出登录');
		}
	};

	renderUser = () => {
		const title = (
			<div className="app-header-user">
				<Avatar icon="user" />
				<span className="username">张三</span>
			</div>
		);
		return (
			<Menu mode="horizontal" onClick={this.switchNavMenu} className="app-header-right">
				<SubMenu title={title}>
					<Menu.Item key="logout">
						<Icon type="logout" />
						退出登录
					</Menu.Item>
				</SubMenu>
			</Menu>
		);
	};

	/**
	 * nav
	 */
	setSelectedKeys = (key) => {
		const { location, history } = this.props;
		const { firstMenu } = this.state;
		this.setState(
			{
				selectedKeys: [key],
			},
			() => {
				if (location.pathname === '/') {
					history.replace(firstMenu);
				} else {
					history.push(key);
				}
			},
		);
	};

	renderMenu = () => {
		const { firstMenu, selectedKeys } = this.state;
		return (
			<Menu
				className="app-nav"
				defaultSelectedKeys={[firstMenu]}
				defaultOpenKeys={[menus[0].path]}
				mode="inline"
				theme="dark"
				selectedKeys={selectedKeys}
				onClick={({ key }) => this.setSelectedKeys(key)}
			>
				{menus.map(subMenu => (
					<SubMenu key={subMenu.path} title={subMenu.title}>
						{subMenu.subMenu
							? subMenu.subMenu.map(item => (
									<Menu.Item key={item.path}>{item.title}</Menu.Item>
							  ))
							: ''}
					</SubMenu>
				))}
			</Menu>
		);
	};

	render() {
		const { route } = this.props;
		return (
			<div className="app">
				<header className="app-header">
					<div className="app-header-left">
						<img src={logo} alt="LOGO" />
						<h1 className="logo-text">零售信贷业务系统</h1>
					</div>
					{this.renderUser()}
				</header>
				<div className="app-content">
					{this.renderMenu()}
					<main className="app-main">{renderRoutes(route.routes)}</main>
				</div>
			</div>
		);
	}
}

export default withRouter(App);
