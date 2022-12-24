import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// all imported components and pages
import { Header, Footer } from "./components";
import { Home, Contact, Login, Register, Reset, OrderHistory } from "./pages";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/contact" element={<Contact />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/reset" element={<Reset />} />
                    <Route
                        exact
                        path="/order-history"
                        element={<OrderHistory />}
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
