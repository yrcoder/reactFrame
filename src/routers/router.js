import login from 'views/login';
import home from 'views/home';
import hellowWorld from 'views/hellowWorld';

export default [
	{
		path: '/login',
		component: login,
		exact: true,
	},
	{
		path: '/',
		component: home,
		routes: [
			{
				path: '/hellowWorld',
				component: hellowWorld,
			},
		],
	},
];
