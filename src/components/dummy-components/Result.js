import styled from 'styled-components';

const ResultLine = styled.h3`
  margin-top: 20px;
`;

function Result() {
  return <ResultLine data-testid='resultLine'></ResultLine>;
}

export default Result;
