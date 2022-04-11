import axios from "axios"

let endpoints = {
    categories: '/categories/',
    courses: '/courses/',
    lessons: (courseID) => `/courses/${courseID}/lessons/`,
    lessonDetail: (lessonID) => `/lessons/${lessonID}/`,
    oauth2Info: '/oauth2-info/',
    login: '/o/token/',
    currentUser: '/users/current-user/',
    register: '/users/',
    comments: (lessonID) => `/lessons/${lessonID}/comments/`,
    addComment: (lessonID) => `/lessons/${lessonID}/add-comments/`,
    rating: (lessonID) => `/lessons/${lessonID}/rating/`
}

export default axios.create({
    baseURL: 'http://localhost:8000/'
})

export { endpoints }