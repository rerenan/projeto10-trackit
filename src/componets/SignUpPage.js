import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner'

import BigLogo from '../assets/img/BigLogo.svg'

export default function SignUpPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [urlImage, setUrlImage] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    
    function registerUser(e){
        e.preventDefault();
        const body ={
            email,
            name,
            image: urlImage,
            password
        }
        setLoading(true);
        const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up',body)
        request
            .then((r)=> {
                navigate('/');
                setLoading(false);
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
        return 'Cadastrar'
    }
    
    return(
        <SignUp>
            <img src={BigLogo} alt="" />
            <form onSubmit={registerUser}>
                <input required type="email" id="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)} value={email} disabled={loading}/>
                <input required type="password" id="password" placeholder="senha" onChange={(e)=> setPassword(e.target.value)} value={password} disabled={loading}/>
                <input required type="text" id="name" placeholder="nome" onChange={(e)=> setName(e.target.value)} value={name} disabled={loading}/>
                <input required type="url" id="imageUrl" placeholder="foto" onChange={(e)=> setUrlImage(e.target.value)} value={urlImage} disabled={loading}/>
                <Button disabled={loading} type="submit">{contentButton()}</Button>
            </form>
            <Link to="/">Já tem uma conta? Faça login!</Link>
        </SignUp>
    )
}

const SignUp = styled.div`
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