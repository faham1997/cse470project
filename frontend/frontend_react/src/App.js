// import react
import React, { useState } from 'react';

// import local modules
import Navigation from './Components/Navigation/Navigation'
import Homepage from './Components/Homepage/Homepage'

function App() {

  // hostname
  const hostname = "https://cse470project.herokuapp.com/"

  // current page state
  const [currentPage, setCurrentPage] = useState(<Homepage/>)

  return (
    <div className="App">
      <Navigation currentPageSetter = {setCurrentPage} hostname = {hostname}/>
      <div>
        {currentPage}
      </div>
    </div>
  );
}

export default App;
