import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import axios from 'axios';
import Table from './components/Table';
import Loader from './components/Loader';
import Description from './components/Description';
import InfiniteScroll from 'react-infinite-scroll-component';

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


  //MOVIES BY ID
  // useEffect(() => {
  //   setMoviesId(movies.map(movie => movie.id))
  // }, [movies]);
  // MOVIES BY ID


  //NEED REFACTOR
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
  //NEED REFACTOR

  //MOVIE INFINITE
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
  //MOVIE INFINITE


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

  // const fetchData = async (pageNum) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${pageNum}&size=${itemsPerPage}`
  //     );
  //     const newMovies = response.data.content;

  //     if (pageNum === 1) {
  //       setMovies(newMovies);
  //       setOriginalMovies(newMovies)
  //     } else {
  //       setMovies((prevMovies) => [...prevMovies, ...newMovies]); // Concatenate new data with existing data
  //       setOriginalMovies((prevMovies) => [...prevMovies, ...newMovies]); // Concatenate new data with existing data
  //     }
  //   } catch (error) {
  //     setError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${0}&size=${5}`
      );
      const newMovies = response.data.content;
      const moviesId = newMovies.map((movie) => movie.id)
      setMovies(newMovies);
      setOriginalMovies(newMovies);
      setMoviesId(moviesId)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])



  const fetchMovieDetails = async () => {
    setShow(!show);
    try {
      const id = moviesId[0]
      const response = await axios.get(
        `http://movie-challenge-api-xpand.azurewebsites.net/api/movies/${id}`
      );
      setMovieDetails(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  console.log("Details", movieDetails)

  const handleClick = async () => {
    setShow(!show);
    fetchMovieDetails(); // Fetch details of the clicked movie
  };

  // useEffect(() => {
  //   console.log(`Fetching data for page ${page}`);
  //   fetchData(page); // Fetch data on mount and when page changes
  // }, [page]);

  // useEffect(() => {
  //   if (page > 0) {
  //     fetchData(page);
  //   }
  // }, [page]);

  // const handleLoadMore = () => {
  //   setPage(page + 1); // Update page state
  // };



  const handleSort = () => {
    const sortedMovies = [...movies].sort((a, b) => b.revenue - a.revenue).slice(0, 10);
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
    }
  };

  const handleClickedYear = () => {
    if (!clickedYear) {
      setClickedYear(true);
      setClicked(false);
    }
  };

  const handleClickClose = () => {
    setShow(!show)
  }




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
        <Description handleClickClose={handleClickClose} movieDetails={movieDetails} />
      )}
      {/* <Loader /> */}
    </div>
  );
}

export default App;
function async(arg0: string) {
  throw new Error('Function not implemented.');
}

