import React from 'react'
import Audio from '../Audio'
import StyledTextTrainer from './TextTrainer.styles';
import { IconButton } from '@components/uielements/Button/Button';

const TextTrainer = () => {
    return (
        <StyledTextTrainer>
        <div className="container">
            <div className="header">
            <IconButton className="accent static">
			    <i className="material-icons">mic</i>
			</IconButton>
            <span className="title text-accent">Hi, welcome to your audio trainer!</span>
            </div>
            <div className="paragraph"> This is the place where we will practice the text itself prior to filming it. We will display the score here in the end of each practice.</div>
            </div>
            <div className="audioWrapper">
                <Audio></Audio>
            </div>
            </StyledTextTrainer>
    )
}

export default TextTrainer