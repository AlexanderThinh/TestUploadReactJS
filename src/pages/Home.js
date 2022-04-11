import { useState, useEffect } from 'react'
import { ButtonGroup, Row, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import Apis, { endpoints } from "../configs/Apis"
import ECourseCard from '../layouts/ECourseCard'

function Home() {
    const [courses, setCourses] = useState([])
    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(false)
    const [page, setPage] = useState(1)
    // Lay ra param '/?category_id=' tren URL -> luu vao bien location -> location.search = /?category_id=
    const location = useLocation()
    // Lay ra param '/?category_id=' tren URL -> luu vao bien location -> location.search = /?category_id=

    useEffect(() => {

        const loadCourses = async () => {
            let query = location.search
            console.log(query);
            if(query === '') {
                query = `?page=${page}`
            } else {
                query += `&page=${page}`
            }

            try {
                let res = await Apis.get(`${endpoints.courses}${query}`)
                setCourses(res.data.results)

                setPrev(res.data.previous != null)
                setNext(res.data.next != null)
            } catch(err) {
                console.error(err)
            }
        }
        loadCourses()
    }, [location.search, page])

    const paging = (inc) => {
        setPage(page + inc)
    }

    return (
        <>
            <h1 className='text-danger text-center'>Danh Mục Khóa Học</h1>

            <ButtonGroup>
                <Button variant='info' onClick={() => paging(-1)} disabled={!prev}>&lt;&lt;</Button>
                <Button variant='info' onClick={() => paging(1)} disabled={!next}>&gt;&gt;</Button>
            </ButtonGroup>

            <Row>
                {courses.map(course => {
                    return <ECourseCard key={course.id} obj={course} />
                })}
            </Row>
        </>
    )
}

export default Home