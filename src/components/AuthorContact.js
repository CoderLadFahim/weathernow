import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function AuthorContact({ authorContactToggler }) {
	const authorImgUrl = 'https://cdn.wallpapersafari.com/45/18/L62TrB.jpg';

	const links = {
		linkedIn: 'https://www.linkedin.com/in/fahim-al-emroz-52b21720b/',
		github: 'https://github.com/CoderLadFahim',
		upwork: 'https:www.upwork.com/',
	};

	const authorEmail = 'fahimalemroz@gmail.com';

	const copyEmailToClipboard = () => {
		navigator.clipboard.writeText(authorEmail);
		alert('Author email copied to clipboard');
	};

	return (
		<section
			className="coder-info bg-gray-800 text-gray-200 text-font-bold absolute top-0 right-0 bottom-0 left-0 bg-opacity-95 z-10 pt-10"
			onClick={({ target: { classList: nodeClasses } }) =>
				Array.from(nodeClasses).includes('coder-info')
					? authorContactToggler()
					: ''
			}
		>
			<div className="contact-content bg-gray-900 shadow rounded-2xl w-3/4 h-5/6 mx-auto my-0 flex flex-col items-center justify-evenly relative">
				<div
					className="coder-image w-28 h-28 rounded-full ring-4"
					style={{
						backgroundImage: `url(${authorImgUrl})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				></div>
				<h1 className="text-xl">
					<span className="text-blue-400">{'<'}</span>
					<span className="text-green-400">CoderLadFahim</span>
					<span className="text-blue-400">{'/>'}</span>
				</h1>
				<ul className="w-3/4 flex items-center justify-around lg:justify-center lg:space-x-20 text-gray-400">
					<li className="social-icon">
						<a href={links.linkedIn} target="_blank">
							<FontAwesomeIcon icon={faLinkedin} />
						</a>
					</li>
					<li className="social-icon">
						<a href={links.github} target="_blank">
							<FontAwesomeIcon icon={faGithub} />
						</a>
					</li>
					<li className="social-icon" onClick={copyEmailToClipboard}>
						<FontAwesomeIcon icon={faEnvelope} />
					</li>
				</ul>
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
