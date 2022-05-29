import styled from "styled-components"

export default function Habit({text, days}){

    return (
        <HabitBox>
        <h1>{text}</h1>
        </HabitBox>
    )
}
const HabitBox = styled.div`
    background: #FFFFFF;
    border-radius: 5px;
    padding: 13px 15px;
    margin-bottom: 10px;
    h1 {
        font-size: 20px ;
        color: #666666 ;
    }
`