import axios from "axios"
import { useContext } from "react"
import styled from "styled-components"


import checkIcon from '../assets/img/checkIcon.svg'
import UserContext from "../contexts/UserContext"

export default function TodayHabit({ id, name, done, currentSequence, highestSequence, getTodayHabits }) {
    
    const { token } = useContext(UserContext);

    function doneHabit() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
       

        if (done) {
           
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,'',config)

            request.then((res) => {
                getTodayHabits();
            })
        }else{
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,'',config)

            request.then((res) => {
                getTodayHabits();
            })
        }
    }



    return (
        <HabitBox key={id}>
            <div>
                <h5>{name}</h5>
                <h4>Sequência atual: <ColorText color={done?'#8FC549':'#666666'}>{currentSequence} dias</ColorText></h4>
                <h4>Seu recorde: <ColorText color={currentSequence <= highestSequence?'#8FC549':'#666666'}>{highestSequence} dias</ColorText></h4>
            </div>
            <div>
                <Check background={done? '#8FC549':'#EBEBEB'} onClick={() => doneHabit()}>
                    <img src={checkIcon} alt="" />
                </Check>
            </div>
        </HabitBox>
    )
}

const HabitBox = styled.div`
    background: #FFFFFF;
    border-radius: 5px;
    padding: 13px 15px;
    padding-bottom: 16px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    word-break: break-all;
    h5 {
        font-size: 20px ;
        color: #666666 ;
        margin-bottom: 7px;

    }
    h4{
        color: #666666;
        font-size: 13px;
        line-height: 16px;
        
    }
    >div:last-child{
       width: 60px;
    }
    strong{

    }
`
const ColorText = styled.span`
    color: ${props => props.color}
    `

const Check = styled.div`
    background: ${props => props.background};
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
       width:33px;
    }
`