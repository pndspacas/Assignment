import reset from "../assets/reset.png"


interface Props {
    handleSort: () => void
    handleReset: () => void
}

const Filter: React.FC<Props> = ({ handleSort, handleReset }) => {
    return (
        <>
            <div className="filter-container">
                <button className="filter-btn" onClick={handleSort}>Top 10 Revenue</button>
                <button className="filter-btn"> Top 10 Revenue per Year</button>
                <div className='years-container'>
                    <h5>Select Year</h5>
                    {Array.from({ length: 17 }, (_, index) => (
                        <p key={index}>{2016 - index}</p>
                    ))}
                </div>
                <img src={reset} alt="reset" onClick={handleReset} />
            </div >
        </>
    )
}

export default Filter