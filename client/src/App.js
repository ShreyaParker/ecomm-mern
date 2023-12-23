import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import { useEffect, useState } from "react";
import Homepage from "./pages/Homepage";
import Checkout from "./pages/Checkout";
import {  ShopContextProvider } from "./context/shopContext";

function App() {
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            setIsUser(true);
        }
    }, []);

    return (
        <div className="App">
            <Router>


                <ShopContextProvider>
                    <Navbar isUser={isUser} setIsUser={setIsUser} />
                    <Routes>

                        <Route path="/" element={<Homepage />} />
                        <Route path="/auth" element={<AuthPage setIsUser={setIsUser} />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/purchased-items" />

                    </Routes>
                </ShopContextProvider>

            </Router>
        </div>
    );
}

export default App;
