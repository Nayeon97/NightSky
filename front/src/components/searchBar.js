import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = (props) => {
  const onSearch = (e) => {
    props.setSearch(e.target.value);
  };

  return (
    <SearchWrapper>
      <input
        type="text"
        value={props.search}
        placeholder={props.placeholder}
        onChange={onSearch}
        onKeyPress={props.onKeyPress}
      />
      <IconWrapper>
        <FontAwesomeIcon icon={faSearch} className="user" />
      </IconWrapper>
    </SearchWrapper>
  );
};

export default SearchBar;

const SearchWrapper = styled.div`
  position: relative;
  height: 30px;
  margin-bottom: 20px;
  input {
    display: inline-flex;
    width: 300px;
    height: 50px;
    color: black;
    background: white;
    padding: 0px 30px;
    border: none;
    border-radius: 1rem;
    outline: none;
    font-size: 1rem;
    cursor: text;
    &:focus::-webkit-input-placeholder {
      color: #748ffc;
    }
  }
`;

const IconWrapper = styled.div`
  color: #808080;
  font-size: 20px;
  position: absolute;
  top: 15px;
  right: 10px;
  left: 10px;
  width: 10px;
  cursor: pointer;
`;
