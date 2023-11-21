
import eye from "../assets/eye.png"


const Table = ({ movies, error, loading }) => {
    return (
        <>
            <div className='table-container'>
                {loading ? (
                    <div className='spinner-border text-info'></div>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : movies ? (<table className='table-content'>
                    <thead>
                        <tr>
                            <th>RANKING</th>
                            <th>TITLE</th>
                            <th>YEAR</th>
                            <th>REVENUE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => (
                            <tr key={movie.id}>
                                <td>{movie.rank}</td>
                                <td>{movie.title}</td>
                                <td>{movie.year}</td>
                                {movie.revenue ? <td>${movie.revenue}</td>
                                    : <td>No Data</td>}
                                <td><img src={eye} alt="eye" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) : null}
            </div >
        </>
    )
}

export default Table