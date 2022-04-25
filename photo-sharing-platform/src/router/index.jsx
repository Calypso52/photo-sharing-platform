import React, { Component } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Main from '@/pages/Main'
import Post from '@/pages/Post'

export default class AppRouter extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/main" element={<Main />}></Route>
                    <Route path="/post" element={<Post />}></Route>
                    <Route path="/" element={<Navigate replace to="/main" />} />
                </Routes>
            </div>
        )
    }
}
