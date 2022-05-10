import React, { Component } from 'react'
import avatarImg from '@/assert/img/avatar.jpg'
import { Dropdown, NavDropdown } from 'react-bootstrap'
import { withRouter } from '@/router/withRouter'
import PubSub from 'pubsub-js'
import URLS from '@/request/url'
import axios from 'axios'
import store from '@/redux/store'
import './index.css'

class Header extends Component {
	state = {
		input: ''
	}

	setInput = (e) => {
		this.setState({ input: e.target.value });
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const { input } = this.state;
		const requestParams = {
            input,
			account: JSON.parse(localStorage.getItem('Account')).account
        }
		let res = await axios.post(URLS.USER_SEARCH_PHOTO, requestParams);
		let { body } = res.data;
		let result = body || [];
		
		store.dispatch({ type: 'searchResult', data: result });
		this.props.navigate(`/main/${input}`);
		PubSub.publish('set-selected-index', result);
	}

	toUserInfo = () => {
		this.props.navigate('/userInfo');
	}

	handleSignout = () => {
		localStorage.removeItem('Account');
		this.props.navigate('/login');
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg bg-dark topbar">
					<div className="container">
						<ul className="navbar-nav">
							<li className="nav-item topBarHome">
								<a className="nav-link active" aria-current="page" href="/home">Home</a>
							</li>
						</ul>
						<form onSubmit = { this.handleSubmit } className="d-flex">
							<input 
								className="form-control me-2 topBarInput" 
								type="search" 
								placeholder="Search" 
								aria-label="Search" 
								onChange={ e => this.setInput(e) }
							/>
							<button className="btn btn-danger topBarSearchBtn" type="submit" value="Submit"><i className="fas fa-search"></i></button>
						</form>
						<div className="topBarUser">
							<div 
								className="topBarAvatar"
								onClick = { this.toUserInfo }
							>
								<img src={ avatarImg } alt="avatar" />
							</div>
							<Dropdown>
								<Dropdown.Toggle id='topBarDropdown'></Dropdown.Toggle>
								<Dropdown.Menu variant="dark">
									<Dropdown.Item href="/userInfo">Account Setting</Dropdown.Item>
									<NavDropdown.Divider />
									<Dropdown.Item onClick = {this.handleSignout}>Sign Out</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
				</nav>
			</div>
		)
	}
}

export default withRouter(Header)