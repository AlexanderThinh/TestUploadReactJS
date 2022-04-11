import { useEffect, useRef, useState } from "react"
import { Badge, Button, Col, Form, Image, Row, Spinner } from "react-bootstrap"
import Moment from "react-moment"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import cookie from "react-cookies"
import Rating from "react-rating"

function LessonDetail() {
    const [lesson, setLesson] = useState(null)
    const [comments, setComments] = useState([])
    const [commentContent, setCommentContent] = useState('')
    const commentAreaRef = useRef()
    const [rating, setRating] = useState(0)
    // Lay lessonID tren URL
    const { lessonID } = useParams()
    // Lay lessonID tren URL

    // Lay user toan cuc
    const user = useSelector(state => state.user.user)
    // Lay user toan cuc

    useEffect(() => {
        const loadLesson = async () => {
            try {
                let res = await Apis.get(endpoints.lessonDetail(lessonID), {
                    headers: {
                        'Authorization' : `Bearer ${cookie.load('access_token')}`
                    }
                })
                setLesson(res.data)
                setRating(res.data.rate)
                console.log(res.data);
            } catch(err) {
                console.error(err)
            }
        }
        loadLesson()

        let loadComments = async () => {
            try {
                let res = await Apis.get(endpoints.comments(lessonID))
                setComments(res.data)
            } catch (err) {
                console.error(err);
            }
        }
        loadComments()
    }, [])

    const handleComment = async (e) => {
        e.preventDefault()

        try {
            let res = await Apis.post(endpoints.addComment(lessonID), {
                'content': commentContent
            }, {
                headers: {
                    'Authorization' : `Bearer ${cookie.load('access_token')}`
                }
            })

            // Re-render lai trang de hien thi comment
            setCommentContent('')
            setComments([res.data, ...comments])

            commentAreaRef.current.focus()
        } catch (err) {
            console.error(err);
        }
    }

    const handleRating = async (rate) => {
        if (confirm('Bạn muốn đánh giá bài học này?') == true) {
            try {
                let res = await Apis.post(endpoints.rating(lessonID), {
                    'rating': rate
                }, {
                    headers: {
                        'Authorization' : `Bearer ${cookie.load('access_token')}`
                    }
                })
                console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        }

    }
    
    if (lesson == null) {
        return <Spinner animation="border" />
    }

    let commentBlock = <Link to='/login'>Đăng nhập để bình luận</Link>
    let ratingBlock = ''

    if(user !== null && user !== undefined) {
        commentBlock = <Form onSubmit={handleComment} > 
            <Form.Group className="mb-3" controlId="commentContent">
                <Form.Control 
                    ref={commentAreaRef}
                    as="textarea" 
                    placeholder="Nhập bình luận..." rows={3} 
                    value={commentContent}
                    onChange={e => setCommentContent(e.target.value)}
                />
            </Form.Group>
            <Button type='submit' variant="info">Bình luận</Button>
        </Form>

        ratingBlock = <Rating initialRating={rating} onClick={handleRating} />
    }

    return (
        <>
            <h1 className="text-danger text-center">Chi Tiết Lesson</h1>

            <Row>
                <Col md={4} xs={12}>
                    <Image src={lesson.image} fluid />
                </Col>
                <Col md={8} xs={12}>
                    <h2>{lesson.name}</h2>
                    <p>Ngày tạo: {lesson.created_date}</p>
                    <p>Ngày cập nhật: {lesson.updated_date}</p>
                    <p>
                        {lesson.tags.map(tag => {
                            return <Badge key={tag.id} bg="secondary">{tag.name}</Badge>
                        })}
                    </p>

                    <p>{ratingBlock}</p>
                </Col>
            </Row>
            <hr></hr>
            <div>
                {lesson.content}
            </div>
            <hr></hr>
            {/* Comment Area */}
            {commentBlock}
            
            <hr></hr>

            {comments.map(comment => {
                return <div key={comment.id}>
                    <Row>
                        <Col md={2} xs={5}>
                            <Image src={comment.creater.avatar} roundedCircle fluid />
                            <p>{comment.creater.username}</p>
                        </Col>

                        <Col md={10} xs={7}>
                            <p>{comment.content}</p>
                            <p>Đã bình luận vào lúc: <Moment fromNow>{comment.created_date}</Moment></p>
                        </Col>
                    </Row>
                </div>
            })}
        </>
    )
}

export default LessonDetail