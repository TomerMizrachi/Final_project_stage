import React from 'react'
import StyledLayout from './Layout.styles'
import Header from '@containers/Layout/Header/Header'
import Footer from '@containers/Layout/Footer/Footer'

function Layout(props) {
	return (
		<StyledLayout>
			<Header />
			<article>
				{props.children}
			</article>
			<Footer />
		</StyledLayout>
	)
}

export default Layout