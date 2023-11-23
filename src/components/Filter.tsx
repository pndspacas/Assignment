import reset from "../assets/reset.svg"


interface Props {
    handleSort: () => void;
    handleReset: () => void;
    handleFocus: () => void;
    handleYearSelection: () => void;
    handleClicked: () => void
    handleClickedYear: () => void
    isFocused: boolean,
    selectedYear: number,
    clicked: boolean,
    clickedYear: boolean

}

const Filter: React.FC<Props> = ({ handleSort, handleReset, isFocused, selectedYear, handleFocus, handleYearSelection, handleClicked, handleClickedYear, clicked, clickedYear }) => {


    return (
        <>
            <div className="filter-container">
                <button disabled={clickedYear}
                    onClick={() => {
                        handleClicked();
                        handleSort();
                    }
                    } className={clicked ? "clicked" : "filter-btn-year"} >
                    Top 10 Revenue
                </button>
                {selectedYear ? (
                    <button onClick={handleClickedYear}
                        className={clickedYear ? "clicked" : "filter-btn-year"} > Top 10 Revenue {selectedYear}</button>
                ) : (
                    <button disabled={clicked} className={clickedYear ? "clicked" : "filter-btn-year"}
                        onClick={() => {
                            handleFocus();
                            handleClickedYear();
                        }
                        }
                    >
                        Top 10 Revenue per Year
                    </button>
                )}
                {isFocused && (

                    <div className='container-overlay'>
                        <div className="years-container">
                            <h5>Select Year</h5>
                            {Array.from({ length: 17 }, (_, index) => (
                                <p key={index} onClick={() => handleYearSelection(2016 - index)}>
                                    {2016 - index}
                                </p>
                            ))}
                        </div>
                    </div>
                )}
                {clickedYear && !isFocused && <img src={reset} onClick={handleReset} />}
                {clicked && <img src={reset} onClick={handleReset} />}
            </div >
        </>
    );
};

export default Filter;
