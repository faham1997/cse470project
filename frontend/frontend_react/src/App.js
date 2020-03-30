// import react
import React, { useState } from 'react';

// import local modules
import Navigation from './Components/Navigation/Navigation'
import Homepage from './Components/Homepage/Homepage'
import Login from './Components/Login/Login'
import Registration from './Components/Registration/Registration'

function App() {

  // users info states
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")

  // hostname
  const hostname = "https://cse470project.herokuapp.com/"

  // current page state
  const [currentPage, setCurrentPage] = useState(<Homepage/>)

  return (
    <div className="App">
      <Navigation currentPageSetter = {setCurrentPage} hostname = {hostname} setUserName = {setUserName} setUserEmail = {setUserEmail}/>
      <div>
        {currentPage}
      </div>
    </div>
  );
}

export default App;