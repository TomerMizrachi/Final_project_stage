import React from 'react';
import Banner from './Banner/Banner';
import SearchBar from './Banner/SearchBar/SearchBar';
import DashboardLayout from '@containers/DashboardLayout/DashboardLayout'

import AuditionList from './AuditionsList/AuditionList';


function AllAuditions() {
	return (
		<DashboardLayout>
			<Banner>
			<SearchBar/>
			</Banner>
			<AuditionList/>
		</DashboardLayout>
	)
}

export default AllAuditions;
