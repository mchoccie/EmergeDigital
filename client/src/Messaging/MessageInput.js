import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { TextField, IconButton } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const InputWrapper = styled.div`
  height: 80px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
`;

/**
 *
 * @param {Object} props - React props
 * @param {boolean} props.paired - boolean to heck if matching conversation found
 * @param {Function} props.updateMessages - function to update array of messages
 * in parent object
 * @returns {JSX} - JSX representing messaging input
 */
const MessageInput = ({ paired, updateMessages }) => {
  // stores currently typed message
  const [message, updateMessage] = useState("");

  const userData = useSelector((state) => state.user);

  const handleChange = (event) => {
    updateMessage(event.target.value);
  };

  const submitMessage = () => {
    if (message !== "") {
      updateMessages({ text: message, sender: userData._id });
      updateMessage("");
    }
  };

  return (
    <InputWrapper>
      <TextField
        value={message}
        variant="outlined"
        sx={{ width: "100%", height: "100%" }}
        onChange={handleChange}
        onKeyPress={(event) => (event.key === "Enter" ? submitMessage() : "")}
        autoFocus
        disabled={!paired}
        label="Send a message"
        InputProps={{
          endAdornment: (
            <IconButton
              color="secondary"
              onClick={submitMessage}
              disabled={!paired}
            >
              <SendRoundedIcon />
            </IconButton>
          ),
        }}
      />
    </InputWrapper>
  );
};

MessageInput.propTypes = {
  paired: PropTypes.bool,
  updateMessages: PropTypes.func,
};

export default MessageInput;
