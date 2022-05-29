import styled from "styled-components"
import { useContext } from "react"
import LogoName from "../assets/img/LogoName.svg"
import UserContext from "../contexts/UserContext"

export default function Header(){
    const {userImg} = useContext(UserContext)
    
    return (
        <TopBar>
            <img src={LogoName} alt="" />
            <img src={userImg} alt="" />
        </TopBar>
    )
}

const TopBar= styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 10px 18px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position:fixed;
    display: flex;
    justify-content: space-between;
    top: 0;
    right: 0;
    img{
       :first-child{
           width: 105px;
        }
       :last-child { 
            border-radius: 50%;
            width: 50px;
            height: 50px;
        } 
    }
    `