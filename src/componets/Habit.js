import axios from "axios"
import { useContext } from "react"
import styled from "styled-components"
import trashIcon from '../assets/img/trashIcon.svg'
import UserContext from "../contexts/UserContext"
export default function Habit({index, text, days, id, getMyHabits}){
    const DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

    const { token } = useContext(UserContext)
    function deleteHabit(){
        if (window.confirm("Tem certeza que quer deletar este hábito?")) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const request = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,config)
            request.then((res)=> {
                getMyHabits();
            })
          } else {
            
          }
    }

    
    
    
    return (
        <HabitBox>
            <TopBar>
            <h1>{text}</h1>
            <img src={trashIcon} alt="" onClick={()=> deleteHabit()} />
            </TopBar>
            {DAYS.map((day,index)=> <Day key={index} color={days.indexOf(index)}>{day}</Day>)}
        </HabitBox>
    )
}
const HabitBox = styled.div`
    background: #FFFFFF;
    border-radius: 5px;
    padding: 13px 15px;
    padding-bottom: 17px;
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    word-break: break-all;
    h1 {
        font-size: 20px ;
        color: #666666 ;
        margin-bottom: 12px;
    }
`
const TopBar = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    img{
        width: 13px;
    }
`
const Day = styled.div`
    color: ${props => props.color !== -1 ? 'white' : "#DBDBDB"};
    background-color: ${props => props.color !== -1 ? '#CFCFCF' : ""};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    padding: 4px 7px;
    margin-right: 5px;
`