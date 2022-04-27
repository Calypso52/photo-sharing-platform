import React, { Component } from 'react'
import Layout from '@/components/Layout'
import avatarImg from '@/assert/img/avatar.jpg'
import './index.css'

export default class ImgDetail extends Component {
	render() {
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
											Happy Holiday
										</p>
										<div className='titleLine'></div>
										<div className='detailUserInfo'>
											<div className='detailUserAvatar'>
												<div className="detailUserAvatarBox">
													<img src={ avatarImg } alt="avatar" />
												</div>
											</div>
											<div className='detailUserName'>
												Emily Dobson
											</div>
										</div>
										<p className='detailContent'>
										Fire new gear just dropped. Get it before it's gone. 🔥🔥Treat yourself to $24 pants + up to 70% off everything else when you become a new VIP.
										</p>
									</div>
									<div className='detailLiked'>
										<i className="far fa-heart"></i>
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
