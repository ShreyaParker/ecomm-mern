import {BrowserRouter as Router , Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <div className="App">
      <Router>
          <Navbar/>
          <Routes>
              <Route path="/"/>
              <Route path="/auth" element={<AuthPage/>}/>
              <Route path="/checkout"/>
              <Route path="/purchased-items"/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
