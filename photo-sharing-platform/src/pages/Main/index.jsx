import React, { Component } from 'react'
import Layout from '@/components/Layout'
import URLS from '@/request/url'
import axios from 'axios'
import { withRouter } from '@/router/withRouter'
import store from '@/redux/store'
import ImgPage from '@/components/ImgPage'
import ToPost from '@/components/ToPost'
import Loading from '@/components/Loading'
import PubSub from 'pubsub-js'
import './index.css'

class Main extends Component {
	constructor(props) {
		super(props);
		console.log('in main constructor:', store.getState())
		this.state = {
			resultImage: [],
			isFirst: true,
			isLoading: false
		};
		const result = store.getState().mainSearch
		this.state.resultImage = result;
		if (result.length) this.state.isFirst = false;
	}

	async componentDidMount() {
		// if (window.location.pathname !== '/main' && this.state.isFirst === true) {
		// 	this.setState({ isLoading: true });
		// 	const input = window.location.pathname.split('/').pop();
		// 	const requestParams = {
		// 		input,
		// 		account: JSON.parse(localStorage.getItem('Account')).account
		// 	}
		// 	let res = await axios.post(URLS.USER_SEARCH_PHOTO, requestParams);
		// 	let { body } = res.data;
		// 	let result = body || [];
		// 	this.setState({ resultImage: result, isLoading: false });
		// }
		PubSub.subscribe('set-selected-index', (_, data) => {
			this.setState({ resultImage: data, isLoading: false });
		})
	}

	setResultImage = (curImgId) => {
		const copyResultImage = [...this.state.resultImage];
		this.setState({
			resultImage: copyResultImage.map(item => item.imgId === curImgId ? { ...item, liked: !item.liked } : item)
		});
	}

	render() {
		const { resultImage, isLoading } = this.state;
		return (
			<div>
				<Layout>
					{
						isLoading ?
							<Loading />
							:
							<ImgPage
								data={resultImage}
								setResultImage={this.setResultImage}
							/>
					}
				</Layout>
				<ToPost />
			</div>
		)
	}
}

export default withRouter(Main)