import { Link } from 'react-router-dom';

function NotFound() {
	return (
		<section className="404 bg-gray-700 w-screen text-center h-screen text-gray-100 text-font-bold  flex flex-col items-center justify-center space-y-12">
			<h1 className="text-7xl text-red-400 num-font">404</h1>
			<h2 className="text-4xl text-gray-400">Page Not Found</h2>
			<button className="p-2 rounded-lg bg-blue-600 shadow px-7 font-bold hover:bg-blue-500 transition">
				<Link to="/dashboard">Back to Dashboard</Link>
			</button>
		</section>
	);
}

export default NotFound;
