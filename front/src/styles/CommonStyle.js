import styled from 'styled-components';

export const ExplainContext = styled.div`
  font-family: 'EliceDigitalBaeum';
  font-size: 1.2rem;
  line-height: 1.5rem;
  margin-bottom: ${(props) => `${props.bottom}rem`};
  margin-left: ${(props) => `${props.left}rem`};
  span {
    font-weight: bold;
    color: #4577ba;
    background-image: linear-gradient(transparent 60%, #a5d8ff 40%);
  }
`;

export const TextInput = styled.input`
  min-height: 20px;
  width: 700px;
  margin: 0.5rem;
  padding: 0 1rem;
  border: none;
  border-bottom: 2px solid #ccc;
  cursor: text;
  font-size: ${(props) => `${props.size}rem`};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.mainPurple};
  }
  &:focus::-webkit-input-placeholder {
    color: #748ffc;
  }
`;

// container
export const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
