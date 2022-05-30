import styled from "styled-components";
import dayjs from 'dayjs';
import "dayjs/locale/pt-br"
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";

import TodayHabit from "./TodayHabit";

export default function TodayPage(){
    dayjs.locale('pt-br')
    const TODAY = dayjs().format('dddd').charAt(0).toUpperCase() + dayjs().format('dddd').slice(1)
    const DATE = dayjs().format('DD/MM')

    const {token, setPercentage} = useContext(UserContext);
    const [todayHabits, setTodayHabits] = useState([])
    
    useEffect(()=>{
        if(token !== ''){
            getTodayHabits();
        }   
    },[token])

    function getTodayHabits(){
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",config)

        promise.then((res)=> setTodayHabits(res.data))
        promise.catch((err)=> console.log(err.response.data.message))
    }


    function showPercentage(){
        const habitsConcluded = todayHabits.filter((habit)=> habit.done === true)
        if(habitsConcluded.length > 0){
            const valuePercentage = ((100 * habitsConcluded.length)/ todayHabits.length).toFixed(2) 
            setPercentage(valuePercentage);

            return <ColorText>{valuePercentage}% dos hábitos concluídos </ColorText>
        }
        setPercentage(0);
        return <h3>Nenhum hábito concluído ainda</h3>

    }

    return (
        <Home heigth ={todayHabits.length}>
            <h1>{TODAY}, {DATE}</h1>
            {showPercentage()}
            {todayHabits.map(({id, name, done, currentSequence, highestSequence})=> 
            <TodayHabit key={id}
                id={id} 
                name={name} 
                done={done} 
                currentSequence={currentSequence} 
                highestSequence={highestSequence}
                getTodayHabits={getTodayHabits}
            />)}
        </Home>
    );
}

const Home = styled.div`
    width:100%;
    height: ${props => props.heigth>3? '100%':'calc(100vh - 70px)' };
    padding: 18px;
    margin-top: 70px;
    background-color: #F2F2F2;
    box-sizing: border-box;
     >div:last-child{
        margin-bottom: 120px; 
    }
    h2 {
        margin-bottom: 80px;
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }
    h1{
        color: #126BA5;
        font-size: 23px;
        line-height: 29px;
        
    }
    h3 {
        color: #BABABA;
        font-size: 18px;
        line-height: 22px;
        margin-bottom:28px;
    }
   
`
const ColorText = styled.h3`
    color:#8FC549 !important;
`