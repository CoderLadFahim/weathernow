import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

function AuthorContact({ authorContactToggler }) {
	const authorImgUrl = 'https://cdn.wallpapersafari.com/45/18/L62TrB.jpg';
	const [emailCopied, setEmailCopied] = useState(false);

	const links = {
		linkedIn: 'https://www.linkedin.com/in/fahim-al-emroz-52b21720b/',
		github: 'https://github.com/CoderLadFahim',
		discord: 'https://discord.com/users/857790946413641735',
	};

	const authorEmail = 'fahimalemroz@gmail.com';

	const copyEmailToClipboard = () => {
		navigator.clipboard.writeText(authorEmail);
		setEmailCopied(true);
	};

	return (
		<section
			className="coder-info bg-gray-800 text-gray-200 text-font-bold absolute bg-opacity-95 top-0 right-0 bottom-0 left-0 z-10 grid place-items-center"
			onClick={({ target: { classList: nodeClasses } }) =>
				Array.from(nodeClasses).includes('coder-info')
					? authorContactToggler()
					: ''
			}
		>
			{/* CONTACT CONTENT */}
			<div className="contact-content bg-gray-900 shadow rounded-2xl w-3/4 h-5/6 md:w-3/5 lg:w-1/2  mx-auto my-0 flex flex-col items-center justify-evenly relative">
				<div
					className="coder-image w-28 h-28 rounded-full ring-4"
					style={{
						backgroundImage: `url(${authorImgUrl})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				></div>

				{/* AUTHOR NAME */}

				<h1 className="text-xl">
					<span className="text-blue-400">{'<'}</span>
					<span className="text-green-400">CoderLadFahim</span>
					<span className="text-blue-400">{'/>'}</span>
				</h1>

				{/* CONTACT LINKS */}

				<ul className="w-3/4 flex items-center justify-around lg:justify-center lg:space-x-20 text-gray-400">
					<li className="social-icon" title="LinkedIn">
						<a href={links.linkedIn} target="_blank" rel="noreferrer">
							<FontAwesomeIcon icon={faLinkedin} />
						</a>
					</li>
					<li className="social-icon" title="GitHub">
						<a href={links.github} target="_blank" rel="noreferrer">
							<FontAwesomeIcon icon={faGithub} />
						</a>
					</li>
					<li className="social-icon" title="Discord">
						<a href={links.discord} target="_blank" rel="noreferrer">
							<FontAwesomeIcon icon={faDiscord} />
						</a>
					</li>
				</ul>

				{/* EMAIL COPY BUTTON */}

				<button
					className={`font-bold bg-gray-800 py-2 px-4 rounded-md hover:bg-gray-700 transition text-sm outline-none focus:outline-none ${
						emailCopied ? 'ring-2 ring-blue-300 ' : ''
					}`}
					onClick={copyEmailToClipboard}
				>
					{emailCopied ? 'Email Copied' : 'Copy email to clipboard'}
				</button>

				{/* CLOSE BUTTON */}

				<FontAwesomeIcon
					className="absolute text-gray-500 cursor-pointer bottom-4 lg:top-4 right-5 transform scale-110 hover:text-white transition"
					onClick={authorContactToggler}
					icon={faTimes}
				/>
			</div>{' '}
		</section>
	);
}

export default AuthorContact;
