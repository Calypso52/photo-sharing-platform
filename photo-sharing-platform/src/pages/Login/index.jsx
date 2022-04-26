import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './index.css'
// Import centrally managed url paths
import URL from '@/request/url'
// Import axios request, rename to: $axios
import $axios from '@/request'

export default class Login extends Component {
	componentDidMount() {
		const logedInAccount = JSON.parse(localStorage.getItem('Account'));
		const curTime = new Date().getTime();
		// Have account information and have not expired
		if (logedInAccount && curTime < logedInAccount.expire) {
			this.setState({ accountNumber: logedInAccount.account, passWord: logedInAccount.password });
		}
	}

	state = {
		// account
		accountNumber: '',
		// password
		passWord: '',
		// account input bottom border color
		accountBorderButtomColor: '#fff',
		// account word below
		accountErrorOpacity: 0,
		// password input box border color
		passwordBorderButtomColor: '#fff',
		// pasword word below
		passwordErrorOpacity: 0,
		// Mouse style when searching
		cursor: 'default'
	}

	// data binding
	changeAccountNumber = (e) => {
		this.setState({ accountNumber: e.target.value });
	}

	// data binding
	changePassWord = (e) => {
		this.setState({ passWord: e.target.value });
	}

	// Login authentication
	handleLogin = () => {
		const { accountNumber, passWord } = this.state;
		// account is missing
		if (!accountNumber || accountNumber.length === 0) {
			this.accountHint.innerHTML = 'Please enter your username!';
			this.setState({ accountBorderButtomColor: 'red', accountErrorOpacity: 1 });
		}
		// password is missing
		if (!passWord || passWord.length === 0) {
			this.passwordHint.innerHTML = 'Please enter your password!';
			this.setState({ passwordBorderButtomColor: 'red', passwordErrorOpacity: 1 });
		}
		if (accountNumber.length && passWord.length) {
			const requestParams = {
				account: accountNumber,
				password: passWord
			}
			this.setState({ cursor: 'wait' });
			let loginVerification = $axios.postRequest(URL.LOG_IN_VERIFICATION, requestParams);
			// process result
			loginVerification
				.then(responseData => {
					this.setState({ cursor: 'default' });
					// 1 means account error, 2 means password error, 3 means success
					switch (responseData) {
						case 1:
							this.accountHint.innerHTML = 'Username not found. Please signup first!';
							this.setState({ accountBorderButtomColor: 'red', accountErrorOpacity: 1 });
							break;
						case 2:
							this.passwordHint.innerHTML = 'Password entered incorrectly!'
							this.setState({ passwordBorderButtomColor: 'red', passwordErrorOpacity: 1 });
							break;
						case 3:
							let accountLocalStorage = {
								account: accountNumber,
								password: passWord,
								// Keep the account logged in for one hour
								expire: new Date().getTime() + 1000 * 60 * 60
							};
							localStorage.setItem('Account', JSON.stringify(accountLocalStorage));
							// Here, traverse and delete expired localStorage key-value pairs
							this.clearExpired();
							this.props.history.push("/main");
							break;
						default:
							break;
					}
				})
				.catch(error => {
					this.setState({ cursor: 'default' });
					alert('ERROR:', error.message);
				})
		}
	}

	// account input Box color recovery
	accountRestoreInitial = () => {
		this.setState({ accountBorderButtomColor: '#fff', accountErrorOpacity: 0 })
	}

	// password input Box color recovery
	passwordRestoreInitial = () => {
		this.setState({ passwordBorderButtomColor: '#fff', passwordErrorOpacity: 0 })
	}

	// Every time you log in, delete the expired player data cache in localstorage
	clearExpired = () => {
		const len = localStorage.length;
		const curTime = new Date().getTime();
		for (let i = 0; i < len; i++) {
			let key = localStorage.key(i);
			let value = JSON.parse(localStorage.getItem(key));
			if (value.expire && value.expire <= curTime) localStorage.removeItem(key);
		}
	}

	render() {
		const { accountNumber, passWord } = this.state;
		return (
			<div className="loginUI">
				<div className="login" style={{ cursor: this.state.cursor }}>
					<h2>User Login</h2>
					<div className="login_box">
						{/* required means that it cannot be empty. It must play a big role in the css effect. */}
						{/* Can be abbreviated as required */}
						<input
							type="text"
							className="login_input"
							required
							value={accountNumber}
							style={{ borderBottomColor: this.state.accountBorderButtomColor }}
							onChange={e => this.changeAccountNumber(e)}
							onFocus={this.accountRestoreInitial}
						/>
						<label>Username</label>
						<div ref={c => this.accountHint = c} style={{ marginTop: '-25px', color: 'red', opacity: this.state.accountErrorOpacity }}>Please input your username!</div>
					</div>
					<div className="login_box">
						<input
							type="password"
							className="login_input"
							required="required"
							value={passWord}
							style={{ borderBottomColor: this.state.passwordBorderButtomColor }}
							onChange={e => this.changePassWord(e)}
							onFocus={this.passwordRestoreInitial}
						/>
						<label>Password</label>
						<div ref={c => this.passwordHint = c} style={{ marginTop: '-25px', color: 'red', opacity: this.state.passwordErrorOpacity }}>Please input your password!</div>
					</div>

					<div className="login_bottom">
						{/* login button */}
						<button
							className="bottom_btn1"
							// to="/main"
							onClick={ this.handleLogin }
						>
							Login
						</button>
						{/* signup button */}
						<Link
							className="bottom_btn2"
							to="/signup"
						>
							Signup
						</Link>
					</div>
				</div>
			</div>
		)
	}
}
