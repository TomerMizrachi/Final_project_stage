import React from 'react';
import SiteConfig from '@config/site.config';
import { Box } from '@material-ui/core';
import PracticeGrid from './PracticeGrid/PracticeGrid';

export default function PracticeComp() {
	const auditions = [
		{
			icon:'assignment',
			title: 'View Text',
		},
		{
			icon:'mic',
			title: 'Srart Vocal Practice',
		},
		{
			icon:'videocam',
			title: 'Film Audition',
		}
	];

	return (
		<Box mb={6} >
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
			</Box>
			<PracticeGrid auditions={auditions} />
		</Box>
	)
}
