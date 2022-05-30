import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner'

import BigLogo from '../assets/img/BigLogo.svg'
import UserContext from "../contexts/UserContext";


export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {setUserImg, setToken} = useContext(UserContext)
    
    const navigate = useNavigate();
    
    useEffect(()=> {
       
        const email = localStorage.getItem("email")
        const password = localStorage.getItem("password")
        if(email !== null){
            navigate("/hoje")
            const body = {
                email,
                password
            }
            const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login',body)
            request
            .then((r)=> {
                setToken(r.data.token)
                setUserImg(r.data.image)
            })
        }


    },[])

    function login(event){
        event.preventDefault();
        setLoading(true)
        const body = {
            email,
            password
        }
        const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login',body)
        request
            .then((r)=> {
                setToken(r.data.token)
                setLoading(false);
                setUserImg(r.data.image)
                navigate('/hoje')
                localStorage.setItem("email", email);
                localStorage.setItem("password",password);
                
            })
            .catch((err)=> {
                alert(err.response.data.message);
                setLoading(false);
                
            })
    }

    function contentButton(){
        if(loading){
            return <ThreeDots color="white" height={20} width={55} />
        }
        return 'Entrar'
    }

    return(
        <Login>
            <img src={BigLogo} alt="" />
            <form onSubmit={login}>
                <input required id="email" type="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)}  value={email} disabled={loading}/>
                <input required id="password" type="password" placeholder="senha" onChange={(e)=> setPassword(e.target.value)} value={password} disabled={loading}/>
                <Button disabled={loading} type="submit">{contentButton()}</Button>
            </form>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
        </Login>
    )
}

const Login = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 36px;
    padding-top: 68px;
    box-sizing: border-box;
    form{
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        width: 100%;
        input{
            box-sizing: border-box;
            font-family: 'Lexend Deca', sans-serif;
            font-size: 20px;
            height: 45px;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            margin-bottom: 6px;
            padding: 0px 10px;
            
            ::placeholder{
                color: #DBDBDB;
                
            }
            :disabled{
                background-color: #F2F2F2;
                color: #AFAFAF;
            }
            :-webkit-autofill:disabled{
                -webkit-box-shadow: 0 0 0 30px #F2F2F2 inset !important;
                -webkit-text-fill-color: #AFAFAF;
                box-shadow: 0 0 0 30px #F2F2F2 inset ;
            }
        }
    }
    img{
        width: 180px;
        height: 180px;
    }
    a{
        margin-top:25px;
        color: #52B6FF;
        font-size: 15px;
        line-height: 17px;
    }
`
const Button = styled.button`
    width: 100%;
    height: 45px;
    opacity: ${props=> props.disabled? '70%': '100%'};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #52B6FF;
    border-radius: 5px;
    color:white;
    font-size: 20.976px;
    line-height: 26px;
    `