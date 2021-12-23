import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";
import sendFetch from "../../utils/sendFetch"
import receiveFetch from "../../utils/receiveFetch"
import { timovi, spolovi, razine } from "../../utils/helper_arrays";

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    background: #c8d8e4;
`;

const Formstyled = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #cacede;
    
    h1 {
        width: 100%;
        padding: 1rem;
        font-size: 3rem;
        background-color: #2b6777;
        text-align: center;
    }

    input[type=submit] {
        font-size: 2.5rem;
        margin: 1rem;
    }
`;

const Div = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem;
    background-color: #f0f1f5;
    font-size: 3rem;
    padding: 1.5rem;

    label {
        margin-right: 1rem;
    }
`;

const Inputdiv = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 3rem;
    margin: 3rem;
`;

const UserForm = () => {

    const { type, id } = useParams()

    const [ userinfo, setUserinfo ] = useState({
        ime: "",
        prezime: "",
        datum: "",
        spol: "",
        razina: "",
        email: "",
        tel: "",
        tim: type
    })

    const { ime, prezime, datum, spol, razina, email, tel, tim } = userinfo

    useEffect(() => {
        async function fetchData() {
            const res = await receiveFetch("/api/get_userform", "POST", { id })
            setUserinfo(res)
        }
        if (id) fetchData()
    }, [])

    
    function sendUserinfo(e) {     
        e.preventDefault()
        if (id) sendFetch("/api/update_user", "POST", userinfo)
        else sendFetch("/api/create_user", "POST", userinfo)
        window.location.href = `/tim/${type}`
    }
    
    function handleInput(e) {
        setUserinfo(prev => ({ ...prev, [e.target.name]: e.target.value}))
    }
    
    return (
        <Wrapper>
        <Formstyled onSubmit={sendUserinfo}>
            <h1>Obrazac za člana</h1>

            <Div>
                <Inputdiv>
                <label htmlFor="ime">Ime:</label>
                <input onChange={handleInput} type="text" id="ime" name="ime" value={ime}/>
                </Inputdiv>

                <Inputdiv>
                <label htmlFor="prezime">Prezime:</label>
                <input onChange={handleInput} type="text" id="prezime" name="prezime" value={prezime}/>
                </Inputdiv>
            </Div>

            <Div>
                <Inputdiv>
                <label htmlFor="tel">Broj mobitela:</label>
                <input onChange={handleInput} type="tel" id="tel" name="tel" value={tel}/>
                </Inputdiv>

                <Inputdiv>
                <label htmlFor="email">Email:</label>
                <input onChange={handleInput} type="email" id="email" name="email" value={email}/>
                </Inputdiv>
            </Div>	

            <Div>
                <Inputdiv>
                <label htmlFor="datum">Datum rođenja:</label>
                <input onChange={handleInput} type="date" id="datum" name="datum" value={datum}/>
                </Inputdiv>
            </Div>

            <Div onChange={handleInput}>
                <label htmlFor="spol">Odaberi spol:</label>
                <select value={spol ? spol : null} name="spol" id="spol">
                    <option disabled selected value> -- odaberi opciju -- </option>
                    {spolovi.map(spol => <option value={spol}>{spol}</option>)}
                </select>
            </Div>    

            <Div onChange={handleInput}>
                <label htmlFor="razina">Odaberi razinu članstva:</label>
                <select value={razina ? razina : null} name="razina" id="razina">
                    <option disabled selected value> -- odaberi opciju -- </option>
                    {razine.map(razina => <option value={razina}>{razina}</option>)}
                </select>
            </Div>        

            <Div onChange={handleInput}>
                <label htmlFor="tim">Odaberi tim:</label>
                <select value={tim} name="tim" id="tim">
                    {timovi.map(tim => <option value={tim}>{tim}</option>)}
                </select>
            </Div>

            <input value="Spremi" type="Submit"/>
        </Formstyled>
        </Wrapper>
    )
}

export default UserForm;
