import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// all imported components and pages
import { Header, Footer } from "./components";
import {
    Home,
    Contact,
    Login,
    Register,
    Reset,
    OrderHistory,
    Admin,
} from "./pages";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";

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
                    <Route
                        exact
                        path="/admin/*"
                        element={
                            <AdminOnlyRoute>
                                <Admin />
                            </AdminOnlyRoute>
                        }
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
