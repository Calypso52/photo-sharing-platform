import React, { Component } from 'react'
import avatarImg from '@/assert/img/avatar.jpg'
import { Dropdown, NavDropdown } from 'react-bootstrap'
import './index.css'

export default class Header extends Component {
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
						<form className="d-flex">
							<input className="form-control me-2 topBarInput" type="search" placeholder="Search" aria-label="Search" />
							<button className="btn btn-danger topBarSearchBtn" type="submit"><i className="fas fa-search"></i></button>
						</form>
						<div className="topBarUser">
							<div className="topBarAvatar">
								<img src={ avatarImg } alt="avatar" />
							</div>
							<Dropdown>
								<Dropdown.Toggle id='topBarDropdown'></Dropdown.Toggle>
								<Dropdown.Menu variant="dark">
									<Dropdown.Item href="#/action-1">Account Setting</Dropdown.Item>
									<Dropdown.Item href="#/action-2">Modify Infomation</Dropdown.Item>
									<NavDropdown.Divider />
									<Dropdown.Item href="#/action-3">Sign Out</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
				</nav>
			</div>
		)
	}
}
