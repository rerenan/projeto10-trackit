import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import TodayPage from './TodayPage'
export default function App() {
    return (
        <Global>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/cadastro" element={<SignUpPage/>}/>
                    <Route path="/hoje" element={<TodayPage/>}/>
                </Routes>
            </BrowserRouter>
        </Global>
    )
}

const Global = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    height: 100vh;
    width: 100wh;
`