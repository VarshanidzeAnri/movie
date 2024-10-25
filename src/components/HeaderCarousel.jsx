import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader




function HeaderCarousel() {
    return (
      <div className="w-[70vw] mx-auto z-10">
        <Carousel showThumbs={false} showStatus={false}  interval={3000} infiniteLoop stopOnHover >
      <div className="w-[70vw]">
          <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" className="w-[100%] object-fill" />
          <p className="legend">Legend 1</p>
      </div>
      <div className="w-[70vw]">
          <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg" className="w-[100%] object-fill" />
          <p className="legend">Legend 2</p>
      </div>
  </Carousel>
      </div>
    )
}

export default HeaderCarousel
