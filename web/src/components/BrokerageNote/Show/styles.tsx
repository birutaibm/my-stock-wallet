import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NotesList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: #ddd;
`;

export const Menu = styled.nav`
`;

export const NoteContainer = styled.li`
  margin: 10px;
  padding: 5px;
  background-color: #fff;
  border-radius: 5px;
`;

export const NoteHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
`;

export const NoteItens = styled.ul`
  list-style: none;
`;

export const NoteItem = styled.li``;