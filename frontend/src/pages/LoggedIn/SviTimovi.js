import { Link } from "react-router-dom"
import styled from "styled-components"
import { timovi } from "../../utils/helper_arrays";

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    background: #c8d8e4;
    align-items: center;
`;

const Timovi = styled.div`
    width: 100%;
`;

const Styledlink = styled(Link)`
    display: flex;
    font-size: 3rem;
    margin: 1.5rem;
    background: #2b6777;
    align-items: center;
    color: black;
    text-decoration: none;
    justify-content: center;
    padding: 1.2rem;

    @media (min-width: 726px) {
        margin-left: 25%;
        margin-right: 25%;
    }
    :hover {
        box-shadow: 0 5px 10px black, 0 15px 40px gray;
    }
`;

const Svitimovi = () => {
    return (
        <Wrapper>
            <Timovi>
            {timovi.map(tim => {
                return (
                    <Styledlink 
                        key={tim}
                        to={{pathname: `/tim/${tim}`}}
                    >
                        {tim}
                    </Styledlink>
                )
            })}
            </Timovi>
        </Wrapper>
    )
}

export default Svitimovi;
