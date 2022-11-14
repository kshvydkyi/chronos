// import { useState } from 'react';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
import logo from '../../assets/images/icon.png'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import route from '../../api/route';

const LOGOUT = '/api/auth/logout/'
const checkToken = async (token, setAuth) => {
	try {
		const response = await axios.get(`/api/check-token/${token}`);
		// console.log(response.data.status, response.data.values.message);
	}
	catch (e) {
		// console.log(e);
		if (e?.response.data.status === 401) {
			setAuth(false);
		}
	}
}
const Header = () => {
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();
	const currentUser = JSON.parse(localStorage.getItem('autorized'));
	console.log(currentUser);

	const [userAvatar, setUserAvatar] = useState();
	useEffect(() => {
		if (currentUser.currentUser !== 'guest') {
			if (auth) {
				// checkToken(currentUser.accessToken, setAuth);
				if (currentUser) {
					setAuth({ ...currentUser });
				} else {
					setAuth(false);
				}
			}
		}
	}, []);
	const logout = async () => {
		try {

			const response = await axios.post(LOGOUT + currentUser.accessToken);
			// console.log(response.data);
			localStorage.removeItem('autorized');
			setAuth(false);
			navigate('/');

		}
		catch (e) {
			navigate('/500');
		}
	}
	const getUserInfo = async () => {
		try {
			const response = await axios.get(`/api/users/${currentUser.userId}`);
			console.log('userAvatar', response);
			setUserAvatar(response.data.values.result.photo);
		}
		catch (e) {
			console.log(e)
			navigate('/500');
		}
	}
	useEffect(() => {
		if (currentUser.currentUser !== 'guest') {
			getUserInfo();
		}
	}, []);
	return (
		<div>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Container >
					<img src={logo} height={40} alt='logo' />
					<Navbar.Brand href="/">Chronos</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/calendar">Календар</Nav.Link>
							<Nav.Link href="/">Пріколи</Nav.Link>
							<NavDropdown title="Дії" id="collasible-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Дія 1</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Дія 2
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">Дія 3</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="https://birds-attack.web.app/">
									Тут пріколи
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Nav>
							{auth.user ?
								<>
									<div className='d-flex'>
                                <div className='d-flex '>
                                    <Nav.Link className='header-user' href={`/user/${currentUser.userId}`}>{currentUser.user}</Nav.Link>
                                    <img src={userAvatar && userAvatar !== 'undefined' && userAvatar !== undefined ? `${route.serverURL}/avatars/${userAvatar}` : `${route.serverURL}/avatars/default_avatar.png`} className='border border-secondary rounded-circle' height={40} width={40} alt='avatar' />
                                </div>
								</div>
								</>
								: 
								<>
									<Nav.Link href="/login">Вхід</Nav.Link>
									<Nav.Link eventKey={2} href="/registration">
										Реєстрація
									</Nav.Link>
								</>}

						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	)
}
export default Header;