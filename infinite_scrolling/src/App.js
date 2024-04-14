/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  //function to fetch the products via API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=${page * 10}`);
      const data = await res.json();
      setProducts(data);
      setPage(page + 1);
    }
    catch (e) {
      console.log("error while fetching data ", e);
    }
    finally {
      setLoading(false);
    }

  }

  //necessary to limit API calls for data
  const mythrottle = (cb, d) => {
    let timer = 0;
    return (...args) => {
      if(timer) return; //If there is previous active timer, dont do anything and exit the function
      timer = setTimeout(()=> {
        cb(...args);
        timer = null; //After executing, clear the timer
      }, d);
    };
  };

  const handleScroll = mythrottle(() => {
    if ((window.innerHeight + document.documentElement.scrollTop + 500 >= document.documentElement.offsetHeight) && !loading 
    && (products.limit < products.total)) {
      fetchProducts();
    }
  }, 500);

  useEffect(() => {
    fetchProducts();
  }, [])



  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll])

  const { products: allProducts } = products;

  return (
    <div className="App">
      <h1>Infinite Scrolling</h1>
      <div className='products'>
        {
          allProducts?.map((product) => {
            return (
              <div className='products_single' key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <span style={{ fontWeight: "bold" }}>{product.title}</span>
                <span>$ {product.price}</span>
              </div>
            )
          })
        }
      </div>
      {loading && <p style={{fontWeight: "bold"}}>Loading...</p>}

    </div>
  );
}

export default App;
