import React from 'react';
import Layout from '@containers/Layout/Layout';
import Banner from './Banner/Banner';
import SearchBar from './Banner/SearchBar/SearchBar';

import AuditionList from './AuditionsList/AuditionList';


function AllAuditions() {
	return (
		<Layout>
			<Banner>
			<SearchBar/>
			</Banner>
			<AuditionList/>
		</Layout>
	)
}

export default AllAuditions;
