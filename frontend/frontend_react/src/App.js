// import react
import React, { useState } from 'react';

// import local modules
import Navigation from './Components/Navigation/Navigation'
import Homepage from './Components/Homepage/Homepage'

function App() {

  const [currentPage, setCurrentPage] = useState(<Homepage/>) 
  
  return (
    <div className="App">
      <Navigation/>
      <div>
        {currentPage}
      </div>
    </div>
  );
}

export default App;
