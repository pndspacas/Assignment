function App() {
  return (
    <div className="app">
      {/* Header */}
      <nav></nav>
      <header>
        <h1>Movie ranking</h1>
      </header>
      {/*  */}
      {/* Filter buttons */}
      <div className="filter-container">
        <button className="filter-btn">Top 10 Revenue</button>
        <button className="filter-btn"> Top 10 Revenue per Year</button>
      </div>
      {/*  */}
      {/* Table */}
      <div className='table-container'>
        <table>
          <thead>
            <tr className='container'>
              <th className='ranking'>RANKING</th>
              <th className='title'>TITLE</th>
              <th>YEAR</th>
              <th>REVENUE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className='ranking'>1</th>
              <td className='title'>The Lion King</td>
              <td>2019</td>
              <td>$100000</td>
              <td>olho</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/*  */}
    </div>
  );
}

export default App;
