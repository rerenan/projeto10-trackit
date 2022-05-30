import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  styled from 'styled-components'
import { useState } from 'react'
import UserContext from '../contexts/UserContext'

import Header from './Header'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import TodayPage from './TodayPage'
import Footer from './Footer'
import HabitsPage from './HabitsPage'
import HistoryPage from './HistoryPage'
export default function App() {
    const [userImg, setUserImg] = useState('')
    const [token, setToken] = useState('')
    const [percentage, setPercentage] = useState(0)
    return (
        <Global>
            <BrowserRouter>
                 
                <UserContext.Provider value={{userImg, setUserImg, token, setToken, percentage, setPercentage}}>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/cadastro" element={<SignUpPage />} />
                        <Route path="/hoje" element={<><Header /><TodayPage/><Footer/></>} />
                        <Route path='/habitos' element={<><Header/><HabitsPage/><Footer/></>}/>
                        <Route path='/historico' element={<><Header/><HistoryPage/><Footer/></>}/>
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </Global>
    )
}

const Global = styled.div`
        font-family: 'Lexend Deca', sans-serif;
        width: 100%;
        height: 100%;
    
`