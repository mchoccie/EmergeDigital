import React from "react";
import styled from "styled-components";
import TempIcon from "Header/man.png";

const ImgWrapper = styled.img`
  box-sizing: border-box;
  width: calc(var(--header-height) - 1rem);
  border: 2px solid var(--light-gray);
  border-radius: 50%;
  cursor: pointer;
`;

/**
 *
 * @returns {JSX} - JSX representing pfp in header
 */
const UserIcon = () => {
  return (
    <>
      <ImgWrapper src={TempIcon} alt="profile picture" />
    </>
  );
};

export default UserIcon;
