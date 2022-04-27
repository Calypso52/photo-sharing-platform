import React, { Component } from 'react'
import avatarImg from '@/assert/img/avatar.jpg'
import { Dropdown, NavDropdown } from 'react-bootstrap'
import { withRouter } from '@/router/withRouter'
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
		console.log(input)
		const requestParams = {
            input
        }
		let res = await axios.post(URLS.USER_SEARCH_PHOTO, requestParams);
		let { data } = res;
		store.dispatch({ type: 'searchResult', data });
		this.props.navigate('/main');
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg bg-dark topbar">
					<div className="container">
						<ul className="navbar-nav">
							<li className="nav-item topBarHome">
								<a className="nav-link active" aria-current="page" href="/main">Home</a>
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
							<div className="topBarAvatar">
								<img src={ avatarImg } alt="avatar" />
							</div>
							<Dropdown>
								<Dropdown.Toggle id='topBarDropdown'></Dropdown.Toggle>
								<Dropdown.Menu variant="dark">
									<Dropdown.Item href="/userInfo">Account Setting</Dropdown.Item>
									<Dropdown.Item href="#/action-2">Modify Infomation</Dropdown.Item>
									<NavDropdown.Divider />
									<Dropdown.Item href="/login">Sign Out</Dropdown.Item>
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