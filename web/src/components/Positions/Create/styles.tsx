import styled from 'styled-components';

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  *:not(label) {
    flex: 1;
    height: 100%;
  }
`;

export const Container = styled.div`
  margin: 10px;
  background-color: #fff;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    button {
      width: auto;
      margin-left: 5px;
    }
  }
`;
