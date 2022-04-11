import { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import ECourseCard from "../layouts/ECourseCard"

function Lesson() {
    const [lessons, setLessons] = useState([])
    // Lay courseID tren URL
    const { courseID } = useParams()
    // Lay courseID tren URL

    useEffect(() => {
        const loadLessons = async () => {
            try {
                let res = await Apis.get(endpoints.lessons(courseID))
                setLessons(res.data)
                console.log(res.data);
            } catch(err) {
                console.error(err);
            }
        }
        loadLessons()
    }, [])

    return (
        <>
            <h1 className="text-center text-danger">Danh Mục Lesson Of Course</h1>

            <Row>
                {lessons.map(lesson => {
                    return <ECourseCard key={lesson.id} obj={lesson} type='lesson' />
                })}
            </Row>
        </>
    )
}

export default Lesson