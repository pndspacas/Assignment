import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import axios from 'axios';
import Table from './components/Table';
import Loader from './components/Loader';
import Description from './components/Description';



function App() {

  const [movies, setMovies] = useState([])
  const [originalMovies, setOriginalMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false)
  const itemsPerPage = 10;
  const totalItems = 1000;



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${page}&size=${itemsPerPage}`);
        const newMovies = response.data.content;
        setMovies(newMovies)
        setOriginalMovies(newMovies)
        setLoading(false)
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies/${movies.id}`);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error('Error fetching movie details:', error);
  //     }
  //   };

  //   fetchData();
  // }, [movies]);




  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${page}&size=${itemsPerPage}`);
  //       const newMovies = response.data.content;
  //       setMovies(prev => [...prev, ...newMovies])
  //       setOriginalMovies(prev => [...prev, ...newMovies])
  //       setLoading(false)
  //     } catch (error) {
  //       setError(error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [page]);



  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } =
      document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      setLoading(true)
      setPage((prev) => prev + 1);
    }
  }

  const handleClick = () => {
    setShow(!show)
  }

  console.log(movies)

  const handleSort = () => {
    const sortedMovies = [...movies].sort((a, b) => b.revenue - a.revenue)
    setMovies(sortedMovies)
  }

  const handleReset = () => {
    setMovies([...originalMovies])
  }

  return (
    <div className='app'>
      <Header />
      <Filter handleSort={handleSort} handleReset={handleReset} />
      <Table movies={movies} error={error} handleClick={handleClick} />
      {show && <Description handleClick={handleClick} />}

      <Loader />

    </div>
  )

}


export default App;
