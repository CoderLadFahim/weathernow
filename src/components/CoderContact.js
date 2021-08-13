import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

function CoderContact({ coderContactToggler }) {
	const imgUrl =
		'https://i0.wp.com/media.ghgossip.com/wp-content/uploads/2021/02/05170404/Rowan_Atkinson.jpg?fit=885%2C516&ssl=1';

	const links = {
		linkedIn: 'https://www.linkedin.com/in/fahim-al-emroz-52b21720b/',
		github: 'https://github.com/CoderLadFahim',
		upwork: 'https:www.upwork.com/',
	};

	const coderName = '<span><</span>CoderLadFahim<span>/ ></span>';

	return (
		<section className="coder-info bg-gray-800 text-gray-200 text-font-bold absolute top-0 right-0 bottom-0 left-0 bg-opacity-95 z-10 pt-10">
			<div className="contact-content bg-gray-900 shadow rounded-2xl w-3/4 h-5/6 mx-auto my-0 flex flex-col items-center justify-evenly">
				<div
					className="coder-image w-28 h-28 border rounded-full"
					style={{
						backgroundImage: `url(${imgUrl})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				></div>
				<h1 className="text-xl">
					<span className="text-blue-400">{'<'}</span>
					<span className="text-green-400">CoderLadFahim</span>
					<span className="text-blue-400">{'/>'}</span>
				</h1>
				<ul className="w-3/4 flex items-center justify-around lg:justify-evenly  text-gray-400">
					<li className="social-icon">
						<a
							href="https://www.linkedin.com/in/fahim-al-emroz-52b21720b/"
							target="_blank"
						>
							<FontAwesomeIcon icon={faLinkedin} />
						</a>
					</li>
					<li className="social-icon">
						<a href="https://github.com/CoderLadFahim" target="_blank">
							<FontAwesomeIcon icon={faGithub} />
						</a>
					</li>
					<li className="social-icon">
						<a
							href="https://www.facebook.com/Comet.258456/"
							target="_blank"
						>
							<FontAwesomeIcon icon={faFacebook} />
						</a>
					</li>
				</ul>
				<FontAwesomeIcon
					className="absolute text-gray-200 cursor-pointer bottom-4 right-5 transform scale-150 hover:text-white transition"
					onClick={coderContactToggler}
					icon={faTimes}
				/>
			</div>{' '}
		</section>
	);
}

export default CoderContact;
