import React from 'react';
import SiteConfig from '@config/site.config';
import { Box } from '@material-ui/core';
import { IconButton, LinkButton } from '@components/uielements/Button/Button';
import PracticeGrid from './PracticeGrid/AuditionGrid';

export default function FilmedAuditions() {
	const auditions = [
		{
			date: '11/10/2020',
			rate: '#',
		},
		{
			date: '12/10/2020',
			rate: '#',
		},
		{
			date: '13/10/2020',
			rate: '#',
		}
	];

	return (
		<Box mb={6}>
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
				<Box display="flex" alignItems="center">
					<div className="heading4">My Filmed Auditions</div>
				</Box>
				<LinkButton href="#" className="accent round bt-sm outline">View More</LinkButton>
			</Box>

			<PracticeGrid auditions={auditions} />
		</Box>
	)
}
