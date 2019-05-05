import login from 'views/login';
import app from 'views/app';
import hellowWorld from 'views/hellowWorld';

export default [
	{
		path: '/login',
		component: login,
		exact: true,
	},
	{
		path: '/',
		component: app,
		routes: [
			{
				path: '/hellowWorld',
				component: hellowWorld,
			},
		],
	},
];
