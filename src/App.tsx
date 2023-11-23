import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import axios from 'axios';
import Table from './components/Table';
import Loader from './components/Loader';
import Description from './components/Description';

function App() {
  const [movies, setMovies] = useState([]);
  const [moviesId, setMoviesId] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [clicked, setClicked] = useState(false);
  const [clickedYear, setClickedYear] = useState(false);
  const itemsPerPage = 10;
  const totalItems = 1000;

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${page}&size=${itemsPerPage}`);
  //     const newMovies = response.data.content;
  //     setMovies(newMovies)
  //     setOriginalMovies(newMovies)
  //     setLoading(false)
  //   } catch (error) {
  //     setError(error);
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, [])

  // useEffect(() => {
  //   setMoviesId(movies.map(movie => movie.id))
  // }, [movies]);

  // useEffect(() => {
  //   const fetchMovieDetails = async () => {
  //     try {
  //       const movieDetails = await Promise.all(
  //         movies.map(async (movie) => {
  //           const response = await axios.get(`http://movie-challenge-api-xpand.azurewebsites.net/api/movies/${movie.id}`);
  //           return response.data
  //         })
  //       );
  //       setMovieDetails(movieDetails);
  //     } catch (error) {
  //       console.error('Error fetching movie details:', error);
  //     }
  //   };

  //   fetchMovieDetails();
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

  const handleClick = () => {
    setShow(!show);
  };

  const handleSort = () => {
    const sortedMovies = [...movies].sort((a, b) => b.revenue - a.revenue);
    setMovies(sortedMovies);
  };

  const handleReset = () => {
    setMovies([...originalMovies]);
    setSelectedYear('');
    setIsFocused(false);
    setClicked(false);
    setClickedYear(false);
  };

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };

  const handleYearSelection = (year: number) => {
    setSelectedYear(year);
    setIsFocused(false);
  };

  const handleClicked = () => {
    if (!clicked) {
      setClicked(true);
      setIsFocused(false);
      //setMovies([...originalMovies])
    } else {
      setClicked(false);
    }
  };

  const handleClickedYear = () => {
    if (!clickedYear) {
      setClickedYear(true);
      setClicked(false);
    } else {
      setClickedYear(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <Filter
        handleSort={handleSort}
        handleReset={handleReset}
        isFocused={isFocused}
        selectedYear={selectedYear}
        handleFocus={handleFocus}
        handleYearSelection={handleYearSelection}
        handleClicked={handleClicked}
        handleClickedYear={handleClickedYear}
        clicked={clicked}
        clickedYear={clickedYear}
      />
      <Table movies={movies} error={error} handleClick={handleClick} />
      {show && (
        <Description handleClick={handleClick} movieDetails={movieDetails} />
      )}
      <Loader />
    </div>
  );
}

export default App;
