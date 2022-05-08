import React, { Component } from 'react'
import Layout from '@/components/Layout'
import URLS from '@/request/url'
import axios from 'axios'
import { withRouter } from '@/router/withRouter'
import ImgPage from '@/components/ImgPage'
import ToPost from '@/components/ToPost'
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
				<ToPost/>
			</div>
		)
	}
}

export default withRouter(Home)