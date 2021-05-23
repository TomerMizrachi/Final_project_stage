import React from 'react';
import StyledFeaturedActor from '@containers/AllAuditions/AuditionsList/SingleAudition/SingleAudition.styles';
import { Button } from '@components/uielements/Button/Button'
import { Grid } from '@material-ui/core'

export default function SingleActor(props) {
    const { actor } = props;


    return (
        <StyledFeaturedActor className={`featured-audtion-item ${props.className}`}>
            <Grid container direction="coloumn">
                <Grid item className="audition-name heading4" md>Name:{actor.name}</Grid>

                <Grid container className="audition-details" alignItems="center">
                    <Grid item className="audition-content" md>
                        <div className="recruitment-details">Gender: {actor.gender}</div>
                        <div className="audition-name text-accent">Age: {actor.age}</div>
                    </Grid>
                    <Grid item className="audition-content" md>
                        <Grid item className="recruitment-details" md>Body: {actor.bodyStructure}</Grid>
                        <Grid item className="recruitment-details">Height: {actor.height}</Grid>
                    </Grid>
                    <Grid item className="audition-content" md>
                        <Grid item className="recruitment-details" md>Hair: {actor.hair}</Grid>
                        <Grid item className="recruitment-details" md>Eyes: {actor.eyes}</Grid>
                    </Grid>
                    <Grid item className="auditi
                    
                    on-content" md>
                        <Grid item className="audition-name heading4" md>Languges:</Grid>
                        {actor.languages ?
                            actor.languages.map((languge) => (
                                <Grid item key={languge} className="recruitment-details" md>{languge}</Grid>
                            ))
                            : null}
                    </Grid>
                    <Grid item className="audition-content" md>
                        <Grid item className="audition-name heading4" md>Languges:</Grid>
                        {actor.skills ?
                            actor.skills.map((skill) => (
                                <Grid item key={skill} className="recruitment-details" md>{skill}</Grid>
                            ))
                            : null}
                    </Grid>
                    <Grid item className="ctas" rtl><Button className="default round active text-accent offset-left-sm">Send audition</Button></Grid>
                </Grid>
            </Grid>
        </StyledFeaturedActor>
    )
}
