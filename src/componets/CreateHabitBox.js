import axios from "axios"
import { useContext, useState } from "react"
import styled from "styled-components"
import { ThreeDots } from 'react-loader-spinner'
import UserContext from "../contexts/UserContext"

export default function CreateHabitBox({hiddenCreateBox, setHiddenCreateBox, getMyHabits}) {

    const DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

    const { token } = useContext(UserContext)

    const [nameHabit, setNameHabit] = useState('')
    const [selectedDays, setSelectedDays] = useState([])
    const [loading, setLoading] = useState(false);
    


    function selectionDay(index) {
        if (selectedDays.indexOf(index) === -1) {
            setSelectedDays([...selectedDays, index])
        } else {
            const newSelectedDays = selectedDays.filter((selectedIndex) => selectedIndex === index)
            setSelectedDays(newSelectedDays)
        }
    }

    function saveHabit() {
        if(selectedDays.length === 0){
            return alert("Por favor selecione a frequência do hábito a ser criado!")
        }

        setLoading(true)
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
      
        const message = {
            name: nameHabit,
            days: selectedDays
        }

        const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', message, config)
        request.then((res) => {
            setLoading(false);
            setHiddenCreateBox(true);
            getMyHabits();
            setNameHabit("");
            setSelectedDays([]);
        })
        request.catch((err)=>{
            setLoading(false);
            if(err.response.data.message === "Campo Header inválido!"){
                alert("Erro na sessão, por favor efetue o login novamente.")
            }if(err.response.data.message === "Campo \"body\" inválido!"){
                alert("Por favor insira um nome ao hábito!")
            }
        })
    }

    function contentButton() {
        if (loading) {
            return <ThreeDots color="white" height={18} width={35} />
        }
        return 'Salvar'
    }

    return (
        <CreateHabit  hidden={hiddenCreateBox} >
            <Selections>
                <input type="text" placeholder="nome do hábito" onChange={(e) => setNameHabit(e.target.value)} disabled={loading} value={nameHabit}/>
                {DAYS.map((day, index) => <Day key={index} onClick={() => !loading? selectionDay(index): null} color={selectedDays.indexOf(index)}>{day}</Day>)}
            </Selections>
            <div>
                <Button onClick={()=> setHiddenCreateBox(true)}>Cancelar</Button>
                <Button disabled ={loading} onClick={() => saveHabit()}>{contentButton()}</Button>
            </div>
        </CreateHabit>
    )
}

const CreateHabit = styled.div`
    background-color: white;
    border-radius: 5px;
    padding: 18px;
    display:${props=> props.hidden? 'none': 'flex'};
    flex-direction: column;
    align-items: end;
    margin-bottom: 28px;
    div {
        display: flex;
    }
`
const Button = styled.div`
    width: 84px;
    height: 35px;
    border-radius: 4.6px;
    font-size: 16px;
    background-color: #52B6FF;
    opacity: ${props=> props.disabled? '70%': '100%'};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    :first-child{
        background-color: white;
        color: #52B6FF;
        margin-right: 12px;
    }
`
const Selections = styled.div`
    font-size: 20px ;
    color: #DBDBDB ;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 27px;
    input{
        width: 100%;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding: 11px;
        margin-bottom: 10px;
        ::placeholder{
            font-size: 20px ;
            color: #DBDBDB ;            
        }
    }
`
const Day = styled.div`
    color: ${props => props.color !== -1 ? 'white' : ""};
    background-color: ${props => props.color !== -1 ? '#CFCFCF' : ""};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    padding: 4px 7px;
    margin-right: 5px;
`