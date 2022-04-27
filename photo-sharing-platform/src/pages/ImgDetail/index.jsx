import React, { Component } from 'react'
import Layout from '@/components/Layout'
import avatarImg from '@/assert/img/avatar.jpg'
import URLS from '@/request/url'
import axios from 'axios'
import store from '@/redux/store'
import './index.css'

export default class ImgDetail extends Component {
	constructor(props) {
		super(props);
		console.log('in detail constructor:', store.getState());
		this.state = {};
		this.state.imgDetail = store.getState().imgDetail;
	}

	processLikeClick = async () => {
		// jusge whether account expires
		const logedInAccount = JSON.parse(localStorage.getItem('Account')).account;

		// change icon from unlike to like
		const { liked, imgId } = this.state.imgDetail;
		let imgDetail = this.state.imgDetail;
		imgDetail.liked = !liked;
		this.setState({ imgDetail });

		// send axios to change the database
		const requestParams = {
			imgId: imgId,
			account: logedInAccount
		}
		await axios.put(URLS.LIKED_STATUS_CHANGE, requestParams);
	}

	render() {
		const { imgDetail } = this.state;
		return (
			<div>
				<Layout>
					<br />
					<br />
					<div className='container'>
						<div className='row'>
							<div className="col-md-1"></div>
							<div className="col-md-10">
								<div className='detailBox'>
									<div className='detailImageBox'>
										<img src="https://www.bookemon.com/datavolt2/77558ea58e9f6447f80deb1061e9b274_web.jpg" alt="" />
									</div>
									<div className='detailInfoBox'>
										<p className='detailTitle'>
											{imgDetail.title}
										</p>
										<div className='titleLine'></div>
										<div className='detailUserInfo'>
											<div className='detailUserAvatar'>
												<div className="detailUserAvatarBox">
													<img src={avatarImg} alt="avatar" />
												</div>
											</div>
											<div className='detailUserName'>
												{imgDetail.detailUserName}
											</div>
										</div>
										<p className='detailContent'>
											{ imgDetail.content }
										</p>
									</div>
									<div
										className='detailLiked'
										onClick={this.processLikeClick}
									>
										{
											imgDetail.liked ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>
										}
									</div>
								</div>
							</div>
							<div className="col-md-1"></div>
						</div>
					</div>
				</Layout>
			</div>
		)
	}
}
