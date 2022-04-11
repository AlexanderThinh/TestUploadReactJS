import { useEffect, useState } from "react"
import { Container, Form, FormControl, Nav, Navbar, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import cookie from "react-cookies"
import { LogoutUser } from "../ActionCreators/UserCreators"

function Header() {
    const [categories, setCategories] = useState([])
    const [courseNameSearch, setCourseNameSearch] = useState('')
    const nav = useNavigate()
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const loadCategories = async () => {
            let res = await Apis.get(endpoints.categories)
            setCategories(res.data)
        }
        loadCategories()
    }, [])

    //Xu li submit Form -> tim ten Course theo tu khoa nhap vao
    const handleSearch = (e) => {
        e.preventDefault()
        nav(`/?q=${courseNameSearch}`)
    }
    //Xu li submit Form -> tim ten Course theo tu khoa nhap vao

    const handleLogout = (e) => {
        e.preventDefault()
        cookie.remove('access_token')
        cookie.remove('user')
        dispatch(LogoutUser())
    }

    // Kiem tra user login chua?, neu chua d/n thi hien thi option 'Đăng nhập' & 'Đăng ký'
    let pathLogin = <>
        <Link className='nav-link text-danger' to="/login">Đăng nhập</Link>
        <Link className='nav-link text-danger' to="/register">Đăng ký</Link>
    </>

    if(user !== null && user !== undefined) {
        pathLogin = <>
            <Link className='nav-link text-danger' to="/">{user.username}</Link>
            <Link className='nav-link text-danger' to='/' onClick={handleLogout}>Đăng xuất</Link>
        </>
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">E-CourseApp2</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className='nav-link' to="/">Home</Link>
                            {categories.map((c) => {
                                // Truyen param '/?category_id=' vao URL
                                let path = `/?category_id=${c.id}`
                                return <Link className='nav-link' key={c.id} to={path}>{c.name}</Link>
                                // Truyen param '/?category_id=' vao URL
                            })}

                            {pathLogin}

                            <Link className='nav-link' to="/">Hello</Link>
                        </Nav>

                        
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <FormControl
                                type="search"
                                placeholder="Nhập tên khóa học..."
                                className="me-2"
                                aria-label="Search"
                                value={courseNameSearch}
                                onChange={(e) => setCourseNameSearch(e.target.value)}
                            />
                            <Button type="submit" variant="outline-success" 
                                style={{minWidth: '100px'}}                               
                           >
                                Tìm kiếm
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
                
            </Navbar>
        </>
    )
}

export default Header