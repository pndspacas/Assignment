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

  const [hide, setHide] = useState(true)



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


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies/${movies.id}`);
      console.log(response)
    };

    fetchData();
  }, []);


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
    setHide(!hide)
  }

  console.log(hide)


  return (
    <div className='app'>
      <Header />
      <Filter />
      <Table movies={movies} error={error} handleClick={handleClick} />
      <Description />

      {/* <Loader /> */}

    </div>
  )

}


export default App;
