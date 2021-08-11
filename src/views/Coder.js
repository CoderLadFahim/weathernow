function Coder() {
	const imgUrl =
		'https://i0.wp.com/media.ghgossip.com/wp-content/uploads/2021/02/05170404/Rowan_Atkinson.jpg?fit=885%2C516&ssl=1';
	const coderName = '<span><</span>CoderLadFahim<span>/ ></span>';

	return (
		<section className="coder-info h-screen w-screen bg-gray-700 text-gray-200 text-font-bold">
			<div
				className="coder-image w-28 h-28 border rounded-full"
				style={{
					backgroundImage: `url(${imgUrl})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			></div>
			<h-10 className="rounded-full"></h-10>
			<h1 dangerouslySetInnerHTML={{ __html: coderName }}></h1>
			<ul>
				<li className="social-icon">LinkedIn</li>
				<li className="social-icon">GitHub</li>
				<li className="social-icon">Gmail</li>
			</ul>
		</section>
	);
}
export default Coder;
