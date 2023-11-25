import reset from "../assets/reset.svg"


interface Years {
    year: number,
    id: number,
}

interface Props {
    movieYears: Years[],
    handleSortRevenue: () => void;
    handleReset: () => void;
    handleFocus: () => void;
    handleYearSelection: (selectedYear: number) => void;
    handleClicked: () => void
    handleClickedYear: () => void
    handleSortYearAndRevenue: (year: number) => void,
    toggleSidebar: () => void
    isFocused: boolean,
    selectedYear: number | null,
    clicked: boolean,
    clickedYear: boolean

}

const Filter: React.FC<Props> = ({ handleSortRevenue, handleSortYearAndRevenue, handleReset, isFocused, selectedYear, handleFocus, handleYearSelection, handleClicked, handleClickedYear, clicked, clickedYear, movieYears, toggleSidebar }) => {


    return (
        <>
            <div className="filter-container">
                <button disabled={clickedYear}
                    onClick={() => {
                        handleClicked();
                        handleSortRevenue();
                        toggleSidebar();
                    }
                    } className={clicked ? "clicked" : "filter-btn"} >
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
                            toggleSidebar();

                        }
                        }
                    >
                        Top 10 Revenue per Year
                    </button>
                )}
                {isFocused && (
                    <>
                        {movieYears.length > 1 ? <div className='container-overlay'>
                            <div className="years-container">
                                <h5>Select Year</h5>
                                {movieYears.map((yearData: Years) => (
                                    <p key={yearData.id}
                                        onClick={() => {
                                            handleYearSelection(yearData);
                                            handleSortYearAndRevenue(yearData);
                                            toggleSidebar();
                                        }}>
                                        {yearData}
                                    </p>
                                ))}
                            </div>

                        </div > :
                            <div className='filter-img'>
                                <img src={reset} onClick={
                                    () => {
                                        handleReset()
                                        toggleSidebar()
                                    }} />
                            </div>
                        }
                    </>
                )}
                {clickedYear && !isFocused &&
                    <div className='filter-img'>
                        <img src={reset} onClick={
                            () => {
                                handleReset()
                                toggleSidebar()
                            }} />
                    </div>}
                {clicked && !isFocused &&
                    <div className='filter-img'>
                        <img src={reset} onClick={
                            () => {
                                handleReset()
                                toggleSidebar()
                            }} />
                    </div>}
            </div >
        </>
    );
};

export default Filter;
