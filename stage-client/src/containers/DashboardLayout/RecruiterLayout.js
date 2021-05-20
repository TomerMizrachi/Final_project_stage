import React from 'react';
import Layout from '@containers/Layout/Layout';
import StyledDashboardLayout from './DashboardLayout.styles';
import RecruiterSidebar from '@containers/DashboardLayout/Sidebar/RecruiterSidebar';

export default function DashboardLayout({ children }) {
	return (
		<Layout>
			<StyledDashboardLayout className="dashboard-layout">
				<div id="dashboard-sidebar">
					<RecruiterSidebar />
				</div>
				<div id="dashboard-content">
					<div className="wrapper">
						{children}
					</div>
				</div>
			</StyledDashboardLayout>
		</Layout>
	)
}
