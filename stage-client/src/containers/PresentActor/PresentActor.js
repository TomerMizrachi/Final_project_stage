import React from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import Details from './Details/Details'
import Gallery from './Gallery/Gallery' 
import ShowReal from './ShowReal/ShowReal'
import { Box } from '@material-ui/core'

export default function PresentActor(props) {
    console.log(props)
    const actor = props.location.state.actor
    console.log("actor", actor)
    return (
        <DashboardLayout>
            <Details actor={actor} />
            <Box mb={6}/>
            <Gallery pictures={actor.pictures}/>
            <ShowReal videos={actor.videos} />
        </DashboardLayout>
    )
}
