import styled from "styled-components"


export default function HistoryPage(){
    return(
        <History>
        <h1>Histórico</h1>
        <h2>Em breve você poderá ver o histórico dos seus hábitos aqui!</h2>
        </History>
    )
}

const History = styled.div`
    width:100%;
    height: ${props => props.heigth>3? '100%':'calc(100vh - 70px)' };
    padding: 18px;
    margin-top: 70px;
    background-color: #F2F2F2;
    box-sizing: border-box;
     >div:last-child{
        margin-bottom: 120px; 
    }
    h1{
        color: #126BA5;
        font-size: 23px;
        line-height: 29px;
        margin-bottom: 15px;
        
    }
    h2 {
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }
`