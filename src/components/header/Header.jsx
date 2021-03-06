import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bookStore from '../../stores/book-store';
import { loadBooks, loadUsers } from '../../actions/action-creator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Header() {
	const [bookSearched, setbookSearched] = useState('');
	const [books, setBooks] = useState(bookStore.getBooks());
	const [users, setUsers] = useState();
	const [login, setLogin] = useState();
	const [password, setPassword] = useState();

	useEffect(() => {
		bookStore.addEventListener(() =>
			onChange(users, setUsers, bookStore.getUsers)
		);

		if (!users) {
			loadUsers();
		}

		return () =>
			bookStore.removeEventListener(() =>
				onChange(users, setUsers, bookStore.getUsers)
			);
	}, [users]);

	function findUser() {
		let user = users.find(
			(user) => user.login === login && user.password === password
		);
		if (user) {
			document.location.href = `${window.location.origin}/userprofile/${user.id}`;
		}
	}

	function handleChange({ target: { value } }, setValue) {
		setValue(value);
	}

	function onChange(variable, setVariable, getVariable) {
		variable = getVariable();
		setVariable(variable);
	}

	useEffect(() => {
		bookStore.addEventListener(() =>
			onChange(books, setBooks, bookStore.getBooks)
		);

		if (!books) {
			loadBooks();
		}

		return () =>
			bookStore.removeEventListener(() =>
				onChange(books, setBooks, bookStore.getBooks)
			);
	}, [books]);

	useEffect(() => {
		function searchBook(event) {
			if (event.key === 'Enter') {
				let bookFound = books.items.find(
					(book) =>
						bookSearched.toLowerCase() === book.volumeInfo.title.toLowerCase()
				);
				if (bookFound) {
					document.location.href = `${window.location.origin}/detail/${bookFound.id}`;
				}
			}
		}

		if (books) {
			document
				.getElementById('search-bar-input')
				.addEventListener('keydown', (event) => searchBook(event));
		}
		return document
			.getElementById('search-bar-input')
			.removeEventListener('keydown', (event) => searchBook(event));
	}, [books, bookSearched]);

	function showOrHideLoginDisplay(showOrHide, allowOrNotScroll) {
		const body = document.getElementsByTagName('body')[0];

		document.getElementsByClassName(
			'login-background-filter'
		)[0].style.visibility = `${showOrHide}`;

		document.getElementsByClassName(
			'login-wrapper'
		)[0].style.visibility = `${showOrHide}`;

		allowOrNotScroll === 'hidden'
			? (body.style.height = '100%')
			: (body.style.height = 'auto');

		body.style.overflow = `${allowOrNotScroll}`;
	}

	return (
		<>
			<header className="info-header">
				<div className="logo-box1">
					<Link to={'/'}>
						<img
							src="https://trello-attachments.s3.amazonaws.com/60509284c88a9b8f9933dcb3/290x108/cb283c7a32a1a1cfb932a99cc80d45c8/logo-completo-vidama.jpg"
							className="logo-vidama"
							alt=""
						/>
					</Link>
				</div>
				<div className="logo-box2">
					<Link to={'/'}>
						<img
							src="https://trello-attachments.s3.amazonaws.com/60509284c88a9b8f9933dcb3/101x107/73ab43f93e7e535e5cc58d3480957407/logo-small-vidama.jpg"
							className="logo-vidama"
							alt=""
						/>
					</Link>
				</div>

				<div class="search-bar-box">
					<div className="input-box">
						<input
							id="search-bar-input"
							value={bookSearched}
							type="text"
							placeholder="Search"
							maxlength="60"
							onChange={(event) => handleChange(event, setbookSearched)}
						/>
						<div
							className="img-box"
							onClick={() => {
								let bookFound = books.items.find(
									(book) =>
										bookSearched.toLowerCase().trim() ===
										book.volumeInfo.title.toLowerCase()
								);
								if (bookFound) {
									document.location.href = `${window.location.origin}/detail/${bookFound.id}`;
								}
							}}
						>
							<div className="img-icon">
								<span>
									<FontAwesomeIcon icon={faSearch} />
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="login-box">
					<div className="user-photo-or-icon">
						<span
							class="material-icons user-login"
							onClick={() => showOrHideLoginDisplay('visible', 'hidden')}
						>
							account_circle
						</span>
					</div>
					{/* <span
						class="material-icons user-login"
						onClick={() => showOrHideLoginDisplay('visible', 'hidden')}
					>
						account_circle
					</span> */}
					<span class="material-icons cart-top">shopping_cart</span>
				</div>
			</header>
			<div className="login-background-filter"></div>
			<article className="login-wrapper">
				<span
					className="closing-tag"
					onClick={() => showOrHideLoginDisplay('hidden', 'visible')}
				>
					X
				</span>
				<h3 className="login-password-title">Login:</h3>
				<input
					className="login-input"
					value={login}
					type="text"
					onChange={(event) => handleChange(event, setLogin)}
					placeholder="Login..."
				></input>
				<h3 className="login-password-title">Password:</h3>
				<input
					className="login-input"
					value={password}
					type="password"
					onChange={(event) => handleChange(event, setPassword)}
					placeholder="Password..."
				></input>
				<button className="userLoginButton" onClick={() => findUser()}>
					Sign in
				</button>
			</article>
		</>
	);
}
export default Header;

