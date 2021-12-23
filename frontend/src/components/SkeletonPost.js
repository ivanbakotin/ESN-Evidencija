import styled, { keyframes } from "styled-components";

const blink = keyframes`
    50% {
        opacity: 0;
    }
`;

const Content = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    font-size: 2rem;
    margin: 1rem;

    * {
        animation: ${blink} 1s linear infinite;
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Baloon = styled.div`
    height: 10rem;
    width: 10rem;
    border-radius: 50%;
    background-color: lightgray;
`;

const Title = styled.div`
    width: 80%;
    height: 1rem;
    margin: 0.5rem;
    align-self: flex-end;
    background-color: lightgray;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 2rem;

    div {
        height: 2rem;
        width: 3rem;
        border: none;
        border-radius: 1rem;
        background-color: lightgray;
    }
`;

const SkeletonPost = () => {
    return (
        <Content>   
            <Row>
                <Baloon />
                <Column>
                    <Title />
                    <Title />
                    <Title />
                    <Title />
                    <Title />
                </Column>
            </Row>
            <Buttons>
                <div />
                <div /> 
                <div />
                <div />
                <div />
            </Buttons>
        </Content>  

    )
}

export default SkeletonPost;
