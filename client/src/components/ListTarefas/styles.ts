import styled from "styled-components";

export const Container = styled.div`
  margin-top: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  ul {
    width: 40rem;
    border-radius: 4px;
    margin: 5px;
    border: 2px solid #b7aea5;
    background-color: #b7aea5;
    padding-left: 2rem;
    padding-right: 2rem;

    h3 {
      text-align: center;
      color: #221d21;
      font-weight: 600;
      margin-bottom: 0;
    }

    li {
      padding: 1rem;
      color: var(--text-body);
      background-color: #fff;
      border: 0;
      border-radius: 8px;
      margin-bottom: 10px;
      list-style: none;
      display: flex;
      justify-content: space-between;
    }
  }
`;
