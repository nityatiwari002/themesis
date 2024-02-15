import React from "react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "../../styles/Dashboard/Slider.css";

const SliderComponent = ({ images }) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<div className="slider-wrapper">
			<Slider {...settings}>
				{images.map((image, index) => (
					<div key={index}>
						<img src={image} alt={`Slide ${index}`} />
					</div>
				))}
			</Slider>
		</div>
	);
};

export default SliderComponent;
