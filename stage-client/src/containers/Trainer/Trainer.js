import React from 'react';
import Layout from '@containers/Layout/Layout';
import Banner from './Banner/Banner';
import SearchBar from './Banner/SearchBar/SearchBar';
import DashboardLayout from '@containers/DashboardLayout/DashboardLayout'

import PracticeList from './PracticeList/PracticeList';


function Trainer() {
	return (
		<DashboardLayout>
			<PracticeList/>
		</DashboardLayout>
	)
}

export default Trainer;
