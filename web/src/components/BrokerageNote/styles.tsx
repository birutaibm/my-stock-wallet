import styled from 'styled-components';

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  input, select {
    flex: 1;
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

export const Item = styled(Row)`
  align-items: center;
  justify-content: center;
  span {
    flex: 1;
    text-align: center;
    margin-top: 5px;
    padding: 5px;
    border: 1px solid #999;
  }
`;
