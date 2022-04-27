import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Layout from '@/components/Layout'
import URLS from '@/request/url'
import axios from 'axios'
import { checkIsLogin } from '@/functions'
import { withRouter } from '@/router/withRouter'
import store from '@/redux/store'
import './index.css'

class Main extends Component {
	constructor(props) {
		super(props);
		console.log('in constructor:', store.getState())
		this.state = {
			resultImage: store.getState()
		};
	}

	async componentDidMount() {
		// jusge whether account expires
		const logedInAccount = JSON.parse(localStorage.getItem('Account'));
		if (!checkIsLogin(logedInAccount)) {
			this.props.navigate("/login");
			return;
		}

		// if initial data is empty, get requested images
		if (!this.state.resultImage.length) {
			// send axios to change the database
			const requestParams = {
				account: logedInAccount
			}
			let res = await axios.post(URLS.MAIN_PAGE_REQUESTED_IMAGES, requestParams);
			let { data } = res;
			this.setState({ resultImage: data });
		}
	}

	// process like icon item click function
	processLikeClick = async (e) => {
		// jusge whether account expires
		const logedInAccount = JSON.parse(localStorage.getItem('Account'));

		// change icon from unlike to like
		const curImgId = e.currentTarget.getAttribute('data-id');
		const copyResultImage = [...this.state.resultImage];
		this.setState({
			resultImage: copyResultImage.map(item => item.imgId === parseInt(curImgId) ? { ...item, liked: !item.liked } : item)
		});

		// send axios to change the database
		const requestParams = {
			imgId: curImgId,
			account: logedInAccount
		}
		await axios.put(URLS.LIKED_STATUS_CHANGE, requestParams);
	}

	processDetail = async (e) => {
		const curImgId = e.currentTarget.getAttribute('data-id');
		const requestParams = {
			imgId: curImgId
		}
		await axios.post(URLS.IMAGE_DETAIL, requestParams);
	}

	render() {
		// const { resultImage } = this.props;
		const { resultImage } = this.state;
		let itemList = [];
		for (let item of resultImage) {
			itemList.push(
				<Col
					className="colBox"
					key={item.imgId}
					sm={4} md={2}
				>
					<div 
						className="imgBox"
						data-id={item.imgId}
						onClick={this.processDetail}
					>
						<img src={item.src} alt="img" />
					</div>
					<div
						className='imgInfoBox'
						data-id={item.imgId}
						onClick={this.processLikeClick}
					>
						{
							item.liked ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>
						}
					</div>
				</Col>
			)
		}

		return (
			<div>
				<Layout>
					<Container className="mainContainer">
						{/* Stack the columns on mobile by making one full-width and the other half-width */}
						<Row>
							{itemList}
						</Row>
					</Container>
				</Layout>
				<Link to='/post' className='add'>
					<i className="fas fa-plus"></i>
				</Link>
			</div>
		)
	}
}

export default withRouter(Main)