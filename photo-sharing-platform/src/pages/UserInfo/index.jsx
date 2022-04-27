import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import avatarImg from '@/assert/img/avatar.jpg'
import Layout from '@/components/Layout'
import './index.css'

export default class UserInfo extends Component {
	state = {
		account: 'test-account'
	}

	// get user posts method
	getMyPosts = () => {

	}

	// get user favorites method
	getMyFavorites = () => {

	}

	render() {
		const { account } = this.state;
		return (
			<div>
				<Layout>
					<Container className="mainContainer">
						{/* Stack the columns on mobile by making one full-width and the other half-width */}
						<Row>
							<Col md={4}></Col>
							<Col md={4}>
								<Row>
									<Col md={12}>
										<div className='userDetailBox'>
											<div className="avatarBox">
												<img src={avatarImg} alt="avatar" />
											</div>
											<p className='detailName'>My Name</p>
											<p className='detailAccount'>{ account }</p>
											<div className='detailBottom'>
												<Button 
													variant="danger"
													onClick = { this.getMyPosts }
												>
													My Posts
												</Button>
												<Button 
													variant="danger"
													onClick = { this.getMyFavorites }
												>
													My Favorites
												</Button>
											</div>
										</div>
									</Col>
								</Row>
							</Col>
							<Col md={4}></Col>
						</Row>
					</Container>
				</Layout>
			</div>
		)
	}
}
