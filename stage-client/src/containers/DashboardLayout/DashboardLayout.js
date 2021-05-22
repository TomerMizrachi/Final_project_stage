import React from 'react';
import Layout from '@containers/Layout/Layout';
import StyledDashboardLayout from './DashboardLayout.styles';
import DashboardSidebar from '@containers/DashboardLayout/Sidebar/DashboardSidebar';

export default function DashboardLayout(props) {
	console.log("PROPS",props)
	return (
		<Layout>
			<StyledDashboardLayout className="dashboard-layout">
				<div id="dashboard-sidebar">
					<DashboardSidebar user={props} />
				</div>
				<div id="dashboard-content">
					<div className="wrapper">
						{props.children}
					</div>
				</div>
			</StyledDashboardLayout>
		</Layout>
	)
}
