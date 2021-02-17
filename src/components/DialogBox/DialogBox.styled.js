import styled from 'styled-components';

export const Wrapper = styled.div`
    transition: opacity 0.2s ease-out;

    &:not(.visible) {
        opacity: 0;
        pointer-events: none;
    }
`

export const DialogBox = styled.div`
    position: relative;
    z-index: 1;
`

export const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`