import { useEffect, useState } from 'react';
import './App.css';
import Carousel from './components/Carousel';

function App() {

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([])

  const fetchPhotos = async (imgLimit = 3) => {
    setLoading(true);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${imgLimit}`);
      const data = await res.json();
      // console.log(data);
      setImages(data);
    }
    catch (e) {
      console.log("Error in fetching photos ", e);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPhotos(8);
  }, [])

  return (
    <div className="carousel-container">
      <h2 style={{ margin: '20px 60%' }}> Carousel</h2>
      <Carousel
        images={images}
        isLoading={loading}
        imgPerSlide={2}
        onImgClick={(img_id) => { console.log(`image with image id ${img_id} clicked`) }}
      // imageLimit={ }
      // customPrevBtn={ }
      // customNextBtn={ }

      />
    </div>
  );
}

export default App;
