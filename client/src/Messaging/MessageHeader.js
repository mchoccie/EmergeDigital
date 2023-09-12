import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Avatar, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { stringToColor } from "Common/StringAvatar";

const HeaderWrapper = styled.div`
  height: 100%;
  max-height: 60px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem 0 1rem;

  span {
    padding: 1rem;
    font-weight: bold;
  }
`;

/**
 *
 * @param {Object} props - React props
 * @param {boolean} props.popup - boolean flag to check if element should be
 * rendered as a popup
 * @param {String} props.name - name of matching coach
 * @param {Function} props.close - function to close popup by modifying state in
 * parent element
 * @returns {JSX} - JSX representing header of messaging popup
 */
const MessageHeader = ({ popup, name, close }) => {
  return (
    <HeaderWrapper>
      <IconButton
        disableRipple
        color="secondary"
        size="large"
        sx={{ padding: 0 }}
        onClick={close}
      >
        {popup ? <CancelIcon fontSize="inherit" /> : ""}
      </IconButton>
      <span>{name}</span>
      <Avatar alt="coach" sx={{ bgcolor: stringToColor(name) }}>
        {name[0]}
      </Avatar>
    </HeaderWrapper>
  );
};

MessageHeader.propTypes = {
  popup: PropTypes.bool,
  name: PropTypes.string,
  close: PropTypes.func,
};

export default MessageHeader;
