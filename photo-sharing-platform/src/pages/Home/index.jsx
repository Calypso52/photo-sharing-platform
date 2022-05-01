import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Layout from '@/components/Layout'
import URLS from '@/request/url'
import axios from 'axios'
import { withRouter } from '@/router/withRouter'
import ImgPage from '@/components/ImgPage'
import './index.css'

class Home extends Component {
	state = {
		resultImage: []
	}

	async componentDidMount() {
		const logedInAccount = JSON.parse(localStorage.getItem('Account')).account;
		// get recommended pictures
		const requestParams = {
			account: logedInAccount
		}
		let res = await axios.post(URLS.MAIN_PAGE_REQUESTED_IMAGES, requestParams);
		
		let { body } = res.data;
		// console.log('***', body)
		this.setState({ resultImage: body });
	}

	setResultImage = (curImgId) => {
		const copyResultImage = [...this.state.resultImage];
		this.setState({
			resultImage: copyResultImage.map(item => item.imgId === curImgId ? { ...item, liked: !item.liked } : item)
		});
	}

	render() {
		const { resultImage } = this.state;
		return (
			<div>
				<Layout>
					<ImgPage
						data={resultImage}
						setResultImage={this.setResultImage}
					/>
				</Layout>
				<Link to='/post' className='add'>
					<i className="fas fa-plus"></i>
				</Link>
			</div>
		)
	}
}

export default withRouter(Home)