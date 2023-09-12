import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ListWrapper = styled.div`
  height: 310px;
  border-top: 1px solid var(--shadow);
  border-bottom: 1px solid var(--shadow);

  box-sizing: border-box;
  padding: 0.5rem;

  overflow-y: scroll;
`;

const List = styled.ul`
  list-style-type: none;

  margin: 0;

  li {
    display: table;
    max-width: 75%;
    text-align: left;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 4px;
  }

  .left-message {
    background: rgba(221, 221, 221, 0.5);
    margin-right: auto;
  }

  .right-message {
    background: rgba(132, 206, 235, 0.7);

    margin-left: auto;
  }
`;

/**
 *
 * @param {Object} props - React props
 * @param {Array} props.messages - array of messages
 * @returns {JSX} - JSX representing visible messages in popup
 */
const MessageList = ({ messages }) => {
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current.parentNode.scrollTop =
      messageEndRef.current.offsetTop;
  }, [messages]);

  const userData = useSelector((state) => state.user);

  const showMessages = messages.map((message, index) => {
    return (
      <li
        key={index}
        className={
          message.sender !== userData._id ? "left-message" : "right-message"
        }
      >
        {message.text}
      </li>
    );
  });

  return (
    <ListWrapper>
      <List>{showMessages}</List>
      <div ref={messageEndRef}></div>
    </ListWrapper>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
};

export default MessageList;
