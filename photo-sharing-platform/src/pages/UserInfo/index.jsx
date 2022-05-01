import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import avatarImg from '@/assert/img/avatar.jpg'
import Layout from '@/components/Layout'
import ImgPage from '@/components/ImgPage'

import URLS from '@/request/url'
import axios from 'axios'
import './index.css'

export default class UserInfo extends Component {
	state = {
		account: '',
		displayModel: 0,
		resultImage: []
	}

	componentDidMount() {
		this.setState({ account: JSON.parse(localStorage.getItem('Account')).account });
		this.getMyPosts();
	}

	// get user posts method
	getMyPosts = async () => {
		const logedInAccount = JSON.parse(localStorage.getItem('Account')).account;
		
		const requestParams = {
			account: logedInAccount
		}
		let res = await axios.post(URLS.GET_MY_POSTS, requestParams);
		let { body } = res.data;
		this.setState({ resultImage: body });
	}

	// get user favorites method
	getMyFavorites = async (type) => {
		const logedInAccount = JSON.parse(localStorage.getItem('Account')).account;

		const requestParams = {
			account: logedInAccount
		}
		let res = await axios.post(URLS.GET_MY_FAVORITES, requestParams);
		let { body } = res.data;
		this.setState({ resultImage: body });
	}

	setResultImage = (curImgId, category) => {
		const copyResultImage = [...this.state.resultImage];
		if(category === 'heart') {
			this.setState({
				resultImage: copyResultImage.map(item => item.imgId === curImgId ? { ...item, liked: !item.liked } : item)
			});
		} else if(category === 'cross') {
			copyResultImage.forEach((item, i) => {
				if(item.imgId === curImgId) {
					copyResultImage.splice(i, 1);
				}
			})
			this.setState({ resultImage: copyResultImage });
		}
		
	}

	render() {
		const { account, resultImage } = this.state;
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
											<p className='detailAccount'>{account}</p>
											<div className='detailBottom'>
												<Button
													variant="danger"
													onClick={this.getMyPosts}
												>
													My Posts
												</Button>
												<Button
													variant="danger"
													onClick={this.getMyFavorites}
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
						<Row>
							<br />
							<ImgPage
								setResultImage = {this.setResultImage}
								data={resultImage}
							/>
						</Row>
					</Container>
				</Layout>
			</div>
		)
	}
}
