import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import UserContext from "../contexts/UserContext"
import CreateHabitBox from "./CreateHabitBox"
import Habit from "./Habit"

export default function HabitsPage(){
    const {token} = useContext(UserContext)
    const [myHabits, setMyHabits] = useState([])
    const [hiddenCreateBox, setHiddenCreateBox] = useState(true);
    useEffect(()=> {
        getMyHabits();
    },[])
    
    function getMyHabits() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        

        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',config)
        promise.then((res)=> setMyHabits(res.data))
    }
    function generateMyHabits(){
        if(myHabits.length>0){
            return myHabits.map((habit,index)=> <Habit key={index} text={habit.name} days={habit.days} id={habit.id} getMyHabits={getMyHabits}/>)
        }
        return <h2>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h2>
    }

    return(
        <MyHabits heigth={myHabits.length}>
            <TopBar>
                <h1>Meus hábitos</h1>
                <AddHabitButton onClick={()=> setHiddenCreateBox(!hiddenCreateBox) }>+</AddHabitButton>
            </TopBar>
            <CreateHabitBox hiddenCreateBox={hiddenCreateBox} setHiddenCreateBox={setHiddenCreateBox} getMyHabits={getMyHabits}/>
            {generateMyHabits()}
        </MyHabits>
    )
}

const MyHabits = styled.div`
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
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }
    h1{
        color: #126BA5;
        font-size: 23px;
        line-height: 29px;
    }
`
const TopBar = styled.div`
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    
`
const AddHabitButton = styled.div`
    width: 43px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #52B6FF;
    color: white;
    font-size: 26.976px;
    border-radius: 4.6px;
`