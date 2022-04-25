import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Layout from '@/components/Layout'
import './index.css'

export default class Main extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Container className="mainContainer">
						{/* Stack the columns on mobile by making one full-width and the other half-width */}
						<Row>
							<Col className="imgBox" md={3}>
								<img src="https://i.pinimg.com/564x/03/d2/3e/03d23ec69ce3b42131c84737180a1b31.jpg" alt="" />
							</Col>
							<Col className="imgBox" md={3}>
								<img src="https://i.pinimg.com/750x/4a/b9/c2/4ab9c275a3c9781bda789275b0ecc0c1.jpg" alt="" />
							</Col>
							<Col className="imgBox" md={3}>
								<img src="https://i.pinimg.com/564x/03/d2/3e/03d23ec69ce3b42131c84737180a1b31.jpg" alt="" />
							</Col>
							<Col className="imgBox" md={3}>
								<img src="https://i.pinimg.com/564x/03/d2/3e/03d23ec69ce3b42131c84737180a1b31.jpg" alt="" />
							</Col>
						</Row>
					</Container>
				</Layout>
				<Link to='/post' className='add'>
					<i class="fas fa-plus"></i>
				</Link>
			</div>
		)
	}
}
