import styled from "styled-components"
import { Link } from "react-router-dom"
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
export default function Footer(){
    const {percentage} = useContext(UserContext)
    
    
    return(
        <FootBar>
            <Link to="/habitos">Habitos</Link>
            <Link to="/hoje">
                <MiddleButton 
                    value={percentage} 
                    text='Hoje'
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#52B6FF",
                        textColor: "white",
                        pathColor: "white",
                        trailColor: "transparent"
                      })}
                    />
            </Link>
            <Link to="/historico">Histórico</Link>
        </FootBar>
    )
}

const FootBar = styled.div`
    width:100%;
    height: 70px;
    background-color: white;
    position:fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    a{
        text-decoration: none;
        color: #52B6FF;
        font-size: 18px;
        line-height: 22px;
    }
`
const MiddleButton = styled(CircularProgressbar)`
    width: 100px; 
    margin-bottom:60px ;
`