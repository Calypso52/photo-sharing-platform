import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Layout from '@/components/Layout'
// Import centrally managed url paths
import URL from '@/request/url'
// Import axios request, rename to: $axios
import $axios from '@/request'
import { checkIsLogin } from '@/functions'
import './index.css'

export default class Main extends Component {
	// componentDidMount() {
	// 	// jusge whether account expires
	// 	const logedInAccount = JSON.parse(localStorage.getItem('Account'));
	// 	if(!checkIsLogin(logedInAccount)) {
	// 		alert('Account login state expires! Please login again!');
	// 		this.props.history.push("/login");
	// 		return;
	// 	}
	// 	// send axios to change the database
	// 	const requestParams = {
	// 		account: logedInAccount
	// 	}
	// 	$axios
	// 		.postRequest(URL.MAIN_PAGE_REQUESTED_IMAGES, requestParams)
	// 		.then(res => {
	// 			// set initial requested images
	// 			this.setState({ resultImage: res })
	// 		})
	// 		.catch(err => {
	// 			console('ERROR:', err.message);
	// 		})
	// }

	state = {
		resultImage: [
			{
				"imgId": 0,
				"src": 'https://i.pinimg.com/564x/03/d2/3e/03d23ec69ce3b42131c84737180a1b31.jpg',
				"likeAmount": 10,
				"liked": true
			},
			{
				"imgId": 1,
				"src": 'https://i.pinimg.com/564x/03/d2/3e/03d23ec69ce3b42131c84737180a1b31.jpg',
				"likeAmount": 10,
				"liked": true
			},
			{
				"imgId": 2,
				"src": 'https://i.pinimg.com/564x/03/d2/3e/03d23ec69ce3b42131c84737180a1b31.jpg',
				"likeAmount": 10,
				"liked": false
			},
			{
				"imgId": 3,
				"src": 'https://i.pinimg.com/564x/03/d2/3e/03d23ec69ce3b42131c84737180a1b31.jpg',
				"likeAmount": 10,
				"liked": false
			},
			{
				"imgId": 4,
				"src": 'https://i.pinimg.com/564x/03/d2/3e/03d23ec69ce3b42131c84737180a1b31.jpg',
				"likeAmount": 10,
				"liked": false
			},
			{
				"imgId": 5,
				"src": 'https://i.pinimg.com/564x/03/d2/3e/03d23ec69ce3b42131c84737180a1b31.jpg',
				"likeAmount": 10,
				"liked": false
			},
			{
				"imgId": 6,
				"src": 'https://i.pinimg.com/564x/03/d2/3e/03d23ec69ce3b42131c84737180a1b31.jpg',
				"likeAmount": 10,
				"liked": false
			}
		]
	}

	// process like icon item click function
	processLikeClick = (e) => {
		// jusge whether account expires
		const logedInAccount = JSON.parse(localStorage.getItem('Account'));
		if(!checkIsLogin(logedInAccount)) {
			alert('Account login state expires! Please login again!');
			this.props.history.push("/login");
			return;
		}

		// change icon from unlike to like
		const curImgId = e.currentTarget.getAttribute('data-id');
		const copyResultImage = [...this.state.resultImage];
		this.setState({ 
			resultImage: copyResultImage.map(item => item.imgId === parseInt(curImgId) ? {...item, liked: !item.liked} : item) 
		});

		// send axios to change the database
		const requestParams = {
			imgId: curImgId,
			account: logedInAccount
		}
		$axios
			.putRequest(URL.LIKED_STATUS_CHANGE, requestParams)
			.then(() => {
				// 考虑把上面那段更改加到这里，意思是确定在database里面改完了，才在页面上显示更改结果

			})
			.catch(err => {
				console('ERROR:', err.message);
			})
	}

	render() {
		// const { resultImage } = this.props;
		const { resultImage } = this.state;
		let itemList = [];
		for(let item of resultImage) {
			itemList.push(
				<Col 
					className="colBox" 
					key = { item.imgId }
					data-id = { item.imgId }
					sm={4} md={2}
					onClick = { this.processLikeClick }
				>
					<div className="imgBox">
						<img src={ item.src } alt="img" />
					</div>
					<div 
						className='imgInfoBox'
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
							{ itemList }
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
