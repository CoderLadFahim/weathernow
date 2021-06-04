import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

const AppLogo = () => (
	<h1 className="text-3xl pt-3 text-center font-bold">
		<FontAwesomeIcon icon={faCloud} />
		<span className="text-green-400"> Weather</span>
		<span className="text-blue-400">Now</span>
	</h1>
);

export default AppLogo;
