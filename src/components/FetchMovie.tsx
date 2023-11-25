interface Props {
  fetchMoreMovies: () => void;
}

const FetchMovie: React.FC<Props> = ({ fetchMoreMovies }) => {
  return (
    <div className="fetch-container">
      <button onClick={fetchMoreMovies}>More Movies</button>
    </div>
  );
};

export default FetchMovie;
