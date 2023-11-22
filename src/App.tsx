import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import axios from 'axios';
import Table from './components/Table';
import Loader from './components/Loader';
import Description from './components/Description';



function App() {

  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;
  const totalItems = 1000;

  const [show, setShow] = useState(false)
  const [movieDetail, setMovieDetail] = useState()



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${page}&size=${itemsPerPage}`);
        const newMovies = response.data.content;
        setMovies(newMovies)
        setLoading(false)
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const fetchData = useEffect(() => {
    const fetchData = async () => {
      if (movies.length > 0) {
        try {
          // Fetch details for the first movie (example)
          const response = await axios.get(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies/${movies[0].id}`);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      }
    };

    fetchData();
  }, [movies]);




  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${page}&size=${itemsPerPage}`);
  //       const newMovies = response.data.content;
  //       setMovies(prev => [...prev, ...newMovies])
  //       setLoading(false)
  //     } catch (error) {
  //       setError(error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [page]);



  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const handleScroll = () => {
  //   const { scrollTop, clientHeight, scrollHeight } =
  //     document.documentElement;

  //   if (scrollTop + clientHeight >= scrollHeight) {
  //     setLoading(true)
  //     setPage((prev) => prev + 1);
  //   }
  // }

  console.log(movies)

  const handleClick = () => {
    setShow(!show)
  }

  return (
    <div className='app'>
      <Header />
      <Filter />
      <Table movies={movies} error={error} handleClick={handleClick} />
      {show && <Description handleClick={handleClick} />}

      <Loader />

    </div>
  )

}


export default App;
