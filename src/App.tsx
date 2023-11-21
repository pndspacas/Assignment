import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import axios from 'axios';
import Table from './components/Table';



function App() {

  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://movie-challenge-api-xpand.azurewebsites.net/api/movies")
        setMovies(response.data.content)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false);
      }
    }
    fetchData()
  }, [])

  console.log(movies)

  return (
    <div className="app">
      <Header />
      <Filter />
      <Table movies={movies} error={error} loading={loading} />
    </div>
  )

}

export default App;
