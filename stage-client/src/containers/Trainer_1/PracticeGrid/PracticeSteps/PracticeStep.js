import React from 'react';
import StyledPracticeStep from './PracticeStep.styles';
import { Grid, Box, } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { IconButton, LinkButton } from '@components/uielements/Button/Button';
import TextTrainer from '@containers/TextTrainer/TextTrainer'
import Filming from '@containers/Filming'
import Popup from 'reactjs-popup';
import StyledActorFrame from '@containers/ActorTemp/ActorFrame.styles';

export default function PracticeStep({ audition }) {

	return (
		<StyledPracticeStep>
			<div className="header">
				<Box display="flex" alignItems="center" justifyContent="space-evenly">
					<IconButton className="orange static">
						<i className="material-icons">{audition.icon}</i>
					</IconButton>

				</Box>
			</div>
			<Grid item>
				{audition.title == 'Srart Vocal Practice' ? (
					<Box display="flex" alignItems="center" justifyContent="space-evenly" flex={1}>
						<Popup trigger={<button className="heading4 orange bt-sm round">{audition.title}</button>}>
							<TextTrainer></TextTrainer>
						</Popup>
					</Box>
				) : ("")}
				{audition.title == 'Film Audition' ? (
					<Box display="flex" alignItems="center" justifyContent="space-evenly" flex={1}>
						<Popup trigger={<button className="heading4 orange bt-sm round">{audition.title}</button>}>
							<Filming></Filming>
						</Popup>
					</Box>
				) : ("")}
				{audition.title == 'View Text' ? (
					<Box display="flex" alignItems="center" justifyContent="space-evenly" flex={1}>
						<Popup trigger={<LinkButton className="heading4 orange bt-sm round">{audition.title}</LinkButton>}>
						</Popup>
					</Box>
				) : ("")}
			</Grid>
		</StyledPracticeStep>
	)
}
