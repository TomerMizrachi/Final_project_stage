import React from 'react';
import DashboardLayout from '@containers/DashboardLayout/DashboardLayout';
import DashboardTopCards from '@containers/Dashboard/DashboardTopCards/DashboardTopCards';
import VacancyStats from '@containers/Dashboard/VacancyStats/VacancyStats';
import LikedAuditions from '@containers/Dashboard/LikedAuditions';
import InvitedAuditions from '@containers/Dashboard/InvitedAuditions';

function Dashboard() {
	return (
		<DashboardLayout>
			<DashboardTopCards />
			<VacancyStats />
			<LikedAuditions />
			<InvitedAuditions />
		</DashboardLayout>
	);
}

export default Dashboard;
