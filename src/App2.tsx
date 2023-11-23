import axios from 'axios';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const App2 = () => {
    const [pokemon, setPokemon] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false); // Updated initial state to false
    const itemsPerPage = 20; // Changed items per page for better illustration

    const fetchData = async (pageNum) => {
        setLoading(true); // Set loading state to true during fetching
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${(pageNum - 1) * itemsPerPage}`);
            const newPokemon = response.data.results;
            if (pageNum === 1) {
                setPokemon(newPokemon);
            } else {
                setPokemon((prevPokemon) => [...prevPokemon, ...newPokemon]); // Concatenate new data with existing data
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading state to false after fetching
        }
    };

    useEffect(() => {
        console.log(`Fetching data for page ${page}`);
        fetchData(page); // Fetch data on mount and when page changes
    }, [page]);

    const handleLoadMore = () => {
        setPage(page + 1); // Increment page number for next page
    };


    console.log(pokemon)
    return (
        <div>
            <InfiniteScroll
                dataLength={pokemon.length}
                next={handleLoadMore}
                hasMore={!loading}
                loader={<p>Loading...</p>}
            >
                {pokemon.map((poke, index) => (
                    <div key={index}>
                        <p>{poke.name}</p>

                        <img src={poke.url} alt="" />
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default App2;
