import { Link } from 'react-router-dom';

function NotFound() {
	return (
		<section className="404">
			{' '}
			<h1>404</h1>
			<h2>Page Not Found</h2>
			<button>
				<Link to="/dashboard">Dashboard</Link>
			</button>
		</section>
	);
}

export default NotFound;
