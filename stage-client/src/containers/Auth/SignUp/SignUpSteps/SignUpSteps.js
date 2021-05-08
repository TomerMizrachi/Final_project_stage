import React from 'react';
import StyledSignUpSteps from './SignUpSteps.styles';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function SignUpSteps({ step, role = '' }) {
	const { pathname } = useLocation();
	const roleURL = "/signup/" + role;

	return (
		<StyledSignUpSteps>
			<div className="steps">
				{pathname === roleURL ? (
					<Link to="/signup" className="step">Step 1</Link>
				) : (
					<div className={"step " + (step === 'choose-role' ? "active" : "")}>Step 1</div>
				)}

				<div className={"step large " + (step === 'signup' ? "active" : "")}>Step 2</div>
				<div className={"step " + (step === 'actor-profile' ? "active" : "")}>Step 3</div>
			</div>
		</StyledSignUpSteps>
	)
}
