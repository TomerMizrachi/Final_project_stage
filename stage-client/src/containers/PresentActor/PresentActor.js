import React from 'react'
import RecruiterLayout from '../DashboardLayout/RecruiterLayout'
import Details from './Details/Details'
import Gallery from './Gallery/Gallery'
import ShowReal from './ShowReal/ShowReal'
import { Box } from '@material-ui/core'

export default function PresentActor(props) {
    const actor = props.location.state.actor
    const invite = props.location.state.invite
    console.log("actor", actor)
    return (
        <RecruiterLayout>
            <Details actor={actor} invite={invite} />
            <Box mb={6} />
            <Gallery pictures={actor.pictures} />
            <ShowReal videos={actor.videos} />
        </RecruiterLayout>
    )
}
