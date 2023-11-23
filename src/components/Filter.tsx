import reset from "../assets/reset.png"

const Filter = ({ handleSort, handleReset }) => {
    return (
        <>
            <div className="filter-container">
                <button className="filter-btn" onClick={handleSort}>Top 10 Revenue</button>
                <button className="filter-btn"> Top 10 Revenue per Year</button>
                <img src={reset} alt="reset" onClick={handleReset} />
            </div>
        </>
    )
}

export default Filter