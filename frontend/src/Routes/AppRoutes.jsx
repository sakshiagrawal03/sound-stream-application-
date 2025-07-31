import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Search from '../components/Search'
import Upload from '../components/Upload'
import Protected from '../protectedfile/Protected'


const AppRoutes = () => {
    return (
        <Router>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Protected><Home /></Protected>} />
            <Route path="/search" element={<Protected><Search /></Protected>} />
            <Route path="/upload" element={<Protected><Upload /></Protected>} />

        </Routes>
        </Router>
    );
    }

    export default AppRoutes;