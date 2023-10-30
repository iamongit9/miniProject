import CreateorUpload from "./components/Auth/CreateorUpload"
import Navbarr from "./components/Passwords/Navbar"

import { loggedinAtom } from "./components/Atoms"
import { useAtomValue } from "jotai"
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';

import {ThemeProvider } from "next-themes";

const PrivateRoutes = () => {
    const loggedin = useAtomValue(loggedinAtom)
    return (
        loggedin ? <Outlet /> : <Navigate to="/" />
    )
}

function App() {

    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
            <Router>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route element={<Navbarr />} path="/dashboard"/>
                    </Route>
                    <Route path="/" element={<CreateorUpload />} />
                </Routes>
            </Router>
        </ThemeProvider>
    )
}

export default App
