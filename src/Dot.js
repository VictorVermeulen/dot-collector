import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dotTypes from './dot-types';

const getColor = (type) => {
  console.log(type);
  const dot = dotTypes.find((el) => el.label === type);
  console.log(dot);
  if (dot) return dot.color;
}

class Dot extends React.Component {

  render() {
    const { type, id, removeDot, className } = this.props;
    return (
      <li className={className} key="id" onClick={() => removeDot(id)}>
        {type.charAt(0).toUpperCase()}
      </li>
    );
  }
}

Dot.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  removeDot: PropTypes.func.isRequired,
};

Dot.defaultProps = {
  type: undefined,
};

export default styled(Dot)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ type }) => getColor(type)};
  margin: 10px 10px 0 0;
  height: 20px;
  width: 20px;
  color: white;
  font-size: 12px;
  font-weight: 900;
  padding: 5px;
  border-radius: 100%;
  cursor: pointer;
  transition: padding ease-out 500ms;

  &:hover {
    padding: 8px;
  }
`;
