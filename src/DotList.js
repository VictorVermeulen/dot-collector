import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DotList = ({ className, children }) => (
  <ul className={className}>
    {children}
  </ul>
);

DotList.propTypes = {
  className: PropTypes.string.isRequired,
};

DotList.defaultProps = {

};

export default styled(DotList)`
  list-style: none;
  padding: 20px 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;
