import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { LoginUser } from "../ActionCreators/UserCreators"
import Apis, { endpoints } from "../configs/Apis"
import cookie from "react-cookies"

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            // Lay client_id & client_secret
            let info = await Apis.get(endpoints.oauth2Info)
            // Lay client_id & client_secret

            let res = await Apis.post(endpoints.login, {
                'username': username,
                'password': password,
                'client_id': info.data.client_id,
                'client_secret': info.data.client_secret,
                'grant_type': 'password'
            })

            // Luu DL d/n vao Cookies
            // localStorage.setItem('access_token', res.data.access_token)
            cookie.save('access_token', res.data.access_token)
            // Luu DL d/n vao Cookies

            // Lay TT cua current user
            let currentUser = await Apis.get(endpoints.currentUser, {
                headers: {
                    'Authorization': `Bearer ${cookie.load('access_token')}`
                }
            })
            // Lay TT cua current user

            // luu TT current user vao Cookies
            cookie.save('user', currentUser.data)
            // luu TT current user vao Cookies

            dispatch(LoginUser(currentUser.data))
            //Chuyen ve trang Home sau khi d/n
            navigate('/')
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1 className="text-danger text-center">Trang Đăng Nhập</h1>

            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Username..." 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password..." 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Đăng nhập
                </Button>
            </Form>
        </>
    )
}

export default Login