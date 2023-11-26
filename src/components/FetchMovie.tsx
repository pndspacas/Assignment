interface Props {
  fetchMoreMovies: () => void;
}

const FetchMovie: React.FC<Props> = ({ fetchMoreMovies }) => {
  return (
    <div className="fetch-container">
      <div className="fetch-content">
        <button onMouseEnter={fetchMoreMovies}>More Movies</button>
      </div>
    </div>
  );
};

export default FetchMovie;
