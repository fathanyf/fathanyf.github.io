import styled from 'styled-components';

const RandomButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    background-color: #234f1e;
    color: white;
  }
`;

function Button() {
  return (
    <RandomButton data-testid='randomizeButton'>Randomize Number</RandomButton>
  );
}

export default Button;
