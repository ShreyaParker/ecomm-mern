import {BrowserRouter as Router , Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import {useEffect, useState} from "react";
import Homepage from "./pages/Homepage";

function App() {

    const [isUser,setIsUser]=useState(false)



    useEffect(() => {
        if(localStorage.getItem("userId")){
            setIsUser(true)
        }
    }, []);
  return (
    <div className="App">
      <Router>
          <Navbar isUser={isUser} setIsUser={setIsUser}/>
          <Routes>
              <Route path="/" element={<Homepage/>}/>
              <Route path="/auth" element={<AuthPage setIsUser={setIsUser}/>} />
              <Route path="/checkout"/>
              <Route path="/purchased-items"/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
