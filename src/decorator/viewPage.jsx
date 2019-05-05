import React, { PureComponent } from 'react';
import _ from 'lodash';

function getDisplayName(component) {
	return component.displayName || component.name || 'Component';
}

export default config => WrappedComponent => class ViewPage extends PureComponent {
		static displayName = `hoc(${getDisplayName(WrappedComponent)})`;

		// componentDidMount() {
		// 	console.log(`[RUNNING]: ${getDisplayName(WrappedComponent)}`);
		// }

		hasPermissions(permissionCode) {
			// const allPermissions = JSON.parse(storage.getItem(AUDIT_MENU_LIST));
			const allPermissions = {};
			let authorized = false;
			if (_.findIndex(allPermissions, o => permissionCode === o) > -1) {
				authorized = true;
			}

			return authorized;
		}

		render() {
			const { permissionCode } = config;
			if (this.hasPermissions(permissionCode)) {
				return <WrappedComponent {...this.props} />;
			}
			return <h1>没得权限</h1>;
		}
	};
