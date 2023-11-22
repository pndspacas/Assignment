import eye from "../assets/eye.png"


const Table = ({ movies, error, handleClick }) => {
    return (
        <>

            <div className='table-container'>
                {error ? (
                    <p>Error: There is no more data</p>
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
                                <td onClick={handleClick}><img src={eye} alt="eye" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) : null}
            </div>
        </>
    )
}

export default Table