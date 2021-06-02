import { lazy } from 'react';

export const OpenRoutes = [

	{
		path: '/case-studies',
		exact: true,
		component: lazy(() => import('@containers/CaseStudies/CaseStudies')),
	}
];

export const PublicRoutes = [
	{
		path: '/',
		exact: true,
		component: lazy(() => import('@containers/Home/Home')),
	},
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
		component: lazy(() => import('@containers/Trainer/Trainer')),
	},
	{
		path: '/trainer',
		exact: true,
		component: lazy(() => import('@containers/Trainer_1/Trainer')),
	},
	{
		path: '/profile',
		exact: true,
		component: lazy(() => import('@containers/ActorProfile/Profile')),
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
	},
	{
		path: '/allauditions',
		exact: true,
		component: lazy(() => import('@containers/AllAuditions/AllAuditions'))
	},
	{
		path: '/allactors',
		exact: true,
		component: lazy(() => import('@containers/AllActors/AllActors'))
	}
];


