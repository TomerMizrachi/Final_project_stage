import React from 'react';
import Layout from '@containers/Layout/Layout';
import Banner from './Banner/Banner';
import FeaturedActors from './FeaturedActors/FeaturedActors';
import CountersBlock from './CountersBlock/CountersBlock';
import FeaturedAuditions from './FeaturedAuditions/FeaturedAuditions';

function Home() {
	return (
		<Layout>
			<Banner />
			<FeaturedActors />
			<CountersBlock />
			<FeaturedAuditions />
		</Layout>
	)
}

export default Home;
