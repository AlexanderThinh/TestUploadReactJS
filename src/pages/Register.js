import { useRef, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const avatar = useRef()
    const navi = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        let registerUser = async () => {
            const formData = new FormData()
            formData.append('first_name', firstname)
            formData.append('last_name', lastname)
            formData.append('email', email)
            formData.append('username', username)
            formData.append('password', password)
            formData.append('avatar', avatar.current.files[0])

            try {
                let res = await Apis.post(endpoints.register, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                //Chuyen huong ve trang dang nhap sau khi dang ky thanh cong
                navi('/login')
            } catch (err) {
                console.error(err);
            }
        }

        if(password !== null && password === confirmPassword) {
            registerUser()
        }
    }

    return (
        <>
            <h1 className="text-center text-danger">Trang Đăng Ký</h1>

            <Form onSubmit={handleRegister}>
                <RegisterForm 
                    id='firstname' 
                    label='Firstname' 
                    type='text'
                    value={firstname}
                    change={e => setFirstname(e.target.value)}
                />

                <RegisterForm 
                    id='lastname' 
                    label='Lastname' 
                    type='text'
                    value={lastname}
                    change={e => setLastname(e.target.value)}
                />

                <RegisterForm 
                    id='email' 
                    label='Email' 
                    type='email'
                    value={email}
                    change={e => setEmail(e.target.value)}
                />

                <RegisterForm 
                    id='username' 
                    label='Username' 
                    type='text'
                    value={username}
                    change={e => setUsername(e.target.value)}
                />

                <RegisterForm 
                    id='password' 
                    label='Password' 
                    type='password'
                    value={password}
                    change={e => setPassword(e.target.value)}
                />

                <RegisterForm 
                    id='confirm' 
                    label='Confirm Password' 
                    type='password'
                    value={confirmPassword}
                    change={e => setConfirmPassword(e.target.value)}
                />
                

                <Form.Group className="mb-3" controlId="avatar">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control 
                        type="file" 
                        ref={avatar}
                        className='form-control'
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Đăng ký
                </Button>
            </Form>
        </>
    )
}

function RegisterForm(props) {
    return (
        <>
                <Form.Group className="mb-3" controlId={props.id}>
                    <Form.Label>{props.label}</Form.Label>
                    <Form.Control 
                        type={props.type}
                        value={props.value}
                        onChange={props.change}
                    />
                </Form.Group>
        </>
    )
}

export default Register