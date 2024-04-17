import { useEffect, useState, useRef } from 'react'

const Carousel = ({
  images = [],
  isLoading = false,
  imgPerSlide = 2,
  onImgClick = () => {},
  imageLimit = images.length - 1,
  customPrevBtn,
  customNextBtn
}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const imageRef = useRef(null)
  console.log(currentIndex);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageLimit - imgPerSlide + 1 : prevIndex - 1
    )
  }
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageLimit - imgPerSlide + 1 ? 0 : prevIndex + 1
    )
  }

  //everytime new images Data comes in
  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(0);
    }
  }, [images])


  // main carousel component 
  return isLoading ? <div>Loading...</div> : (
    <div className='carousel' style={{ width: imgPerSlide * imageWidth }}>
      <div className='image-container' style={{ transform: `translateX(-${currentIndex * imageWidth}px)` }}>
        {
          images.slice(0, images.length)
            .map((image) => {
              return (
                <img
                  onClick={() => onImgClick(image.id)}
                  onLoad={() => setImageWidth(imageRef.current.width)}
                  ref={imageRef}
                  key={image.id}
                  src={image.url}
                  alt={image.title}
                  className='image' />

              )
            })
        }
      </div>

      {/* If custom buttons are sent in as props then show them else show default buttons  */}
      {customPrevBtn instanceof Function ? customPrevBtn(goToPrev) : <button className='btn prev' onClick={goToPrev}>Prev</button>}
      {customNextBtn instanceof Function ? customNextBtn(goToNext) : <button className='btn next' onClick={goToNext}>Next</button>}
      
    </div>)

};

export default Carousel
