import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Lesson from "../pages/Lesson"
import LessonDetail from "../pages/LessonDetail"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Footer from "./Footer"
import Header from "./Header"

function Body() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/courses/:courseID/lessons/' element={<Lesson />} />
                <Route path='/lessons/:lessonID/' element={<LessonDetail />} />
                <Route path='/login/' element={<Login />} />
                <Route path='/register/' element={<Register />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    )
}

export default Body