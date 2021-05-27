import React from 'react';
import DashboardLayout from '@containers/DashboardLayout/DashboardLayout'
import PracticeList from './PracticeList/PracticeList';


function Trainer() {
	return (
		<DashboardLayout>
			<PracticeList />
		</DashboardLayout>
	)
}

export default Trainer;
