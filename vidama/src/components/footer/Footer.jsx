import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebookSquare,
	faTwitterSquare,
	faInstagramSquare,
	faGooglePlusSquare,
	faYoutubeSquare,
	faPinterestSquare
} from '@fortawesome/free-brands-svg-icons';
import './footer.css';

function Footer() {
	return (
		<footer className="footer">
			<Link to={'/'} className="vidama-logo-link">
				<img
					className="vidama-logo"
					alt="Vidama logo"
					src="https://trello-attachments.s3.amazonaws.com/60509284c88a9b8f9933dcb3/290x108/cb283c7a32a1a1cfb932a99cc80d45c8/logo-completo-vidama.jpg"
				/>
			</Link>
			<div className="contact-info">
				<div className="contact-links">
					<span className="contact-links__link" data-test-id="contact-link">
						About us
					</span>
					<span className="contact-links__link">Contact</span>
					<span className="contact-links__link">Sitemap</span>
					<span className="contact-links__link">Privacy policy</span>
				</div>
				<div className="social-networks">
					<span className="GooglePlus-icon social-networks__network">
						<FontAwesomeIcon icon={faGooglePlusSquare} />
					</span>
					<span className="Facebook-icon social-networks__network">
						<FontAwesomeIcon icon={faFacebookSquare} />
					</span>
					<span className="Youtube-icon social-networks__network">
						<FontAwesomeIcon icon={faYoutubeSquare} />
					</span>
					<span className="Twitter-icon social-networks__network">
						<FontAwesomeIcon icon={faTwitterSquare} />
					</span>
					<span className="Pinterest-icon social-networks__network">
						<FontAwesomeIcon icon={faPinterestSquare} />
					</span>
					<span className="Instagram-icon social-networks__network">
						<FontAwesomeIcon icon={faInstagramSquare} />
					</span>
				</div>
			</div>
			<div className="footer__copyright">
				Copyright © 2020 - Vidama Spain SLU - Skylab Coders Academy
			</div>
		</footer>
	);
}

export default Footer;
