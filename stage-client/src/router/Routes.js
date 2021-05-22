import { lazy } from 'react';

export const OpenRoutes = [
	{
		path: '/',
		exact: true,
		component: lazy(() => import('@containers/Home/Home')),
	},
	{
		path: '/case-studies',
		exact: true,
		component: lazy(() => import('@containers/CaseStudies/CaseStudies')),
	},

	{
		path: '/allauditions',
		exact: true,
		component: lazy(() => import('@containers/AllAuditions/AllAuditions'))
	},
];

export const PublicRoutes = [
	{
		path: '/signup',
		exact: true,
		component: lazy(() => import('@containers/Auth/SignUp/SignUpPages/StartSignUp/StartSignUp')),
	},
	{
		path: '/signup/:userRole(actor|recruiter)',
		exact: true,
		component: lazy(() => import('@containers/Auth/SignUp/SignUpPages/SignUp/SignUp')),
	},
	{
		path: '/signup/actor/profile',
		exact: true,
		component: lazy(() => import('@containers/Auth/SignUp/SignUpPages/SignUpActor/SignUpActor')),
	},
	{
		path: '/login',
		exact: true,
		component: lazy(() => import('@containers/Auth/Login/Login')),
	}
];

export const PrivateRoutes = [
	{
		path: '/dashboard',
		exact: true,
		component: lazy(() => import('@containers/Dashboard/Dashboard')),
	},
	{
		path: '/dashboard/trainer',
		exact: true,
		component: lazy(() => import('@containers/ActorTemp/ActorFrame')),
	},
	{
		path: '/recruiter',
		exact: true,
		component: lazy(() => import('@containers/Dashboard/Recruiter')),
	},
	{
		path: '/recruiter/publish',
		exact: true,
		component: lazy(() => import('@containers/Dashboard/PublishForm/PublishForm')),
	}
];


