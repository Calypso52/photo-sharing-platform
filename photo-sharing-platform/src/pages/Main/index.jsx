import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Layout from '@/components/Layout'
import URLS from '@/request/url'
import axios from 'axios'
import { withRouter } from '@/router/withRouter'
import store from '@/redux/store'
import ImgPage from '@/components/ImgPage'
import './index.css'

class Main extends Component {
	constructor(props) {
		super(props);
		console.log('in main constructor:', store.getState())
		this.state = {};
		this.state.resultImage = store.getState().mainSearch;
	}

	async componentDidMount() {
		// window.location.reload();
		if(window.location.pathname !== '/main') {
			const input = window.location.pathname.split('/').pop();
			const requestParams = {
				input
			}
			let res = await axios.post(URLS.USER_SEARCH_PHOTO, requestParams);
			let { data } = res;
			this.setState({ resultImage: data });
		}
	}

	setResultImage = (curImgId) => {
		const copyResultImage = [...this.state.resultImage];
		this.setState({
			resultImage: copyResultImage.map(item => item.imgId === curImgId ? { ...item, liked: !item.liked } : item)
		});
	}

	render() {
		const { resultImage } = this.state;
		console.log('新数据:', store.getState().mainSearch);
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

export default withRouter(Main)