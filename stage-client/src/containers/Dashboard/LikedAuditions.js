import React from 'react';
import SiteConfig from '@config/site.config';
import { Box } from '@material-ui/core';
import { IconButton, LinkButton } from '@components/uielements/Button/Button';
import AuditionsGrid from '@containers/Dashboard/AuditionsGrid/AuditionsGrid';

export default function LikedAuditions() {
	const auditions = [
		{
			title: 'Intern UX Designer',
			name: 'Maximoz Team',
			image: SiteConfig.BLANK_IMAGE,
			link: '#',
			cost_from: '14,000',
			cost_to: '25,000',
			location: 'London, England',
			map_link: 'https://maps.google.com',
			type: ['FULTIME'],
		},
		{
			title: 'Senior UX Designer',
			name: 'Inacyx Studios',
			image: SiteConfig.BLANK_IMAGE,
			link: '#',
			cost_from: '21,000',
			cost_to: '25,000',
			location: 'Manchester, England',
			map_link: 'https://maps.google.com',
			type: ['FREELANCE', 'PART TIME'],
		},
		{
			title: 'Freelance UI Designer',
			name: 'Naonatu Team',
			image: SiteConfig.BLANK_IMAGE,
			link: '#',
			cost_from: '14,000',
			cost_to: '25,000',
			location: 'London, England',
			map_link: 'https://maps.google.com',
			type: ['FULTIME'],
		},
		{
			title: 'Intern UX Designer',
			name: 'Maximoz Team',
			image: SiteConfig.BLANK_IMAGE,
			link: '#',
			cost_from: '14,000',
			cost_to: '25,000',
			location: 'London, England',
			map_link: 'https://maps.google.com',
			type: ['FULTIME'],
		},
	];

	return (
		<Box mb={6}>
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
				<Box display="flex" alignItems="center">
					<IconButton className="danger heart static offset-right-sm">
						<i className="material-icons">favorite</i>
					</IconButton>
					<div className="heading4">Liked Auditions</div>
				</Box>
				<LinkButton href="#" className="accent round bt-sm outline">View More</LinkButton>
			</Box>

			<AuditionsGrid auditions={auditions} />
		</Box>
	)
}
