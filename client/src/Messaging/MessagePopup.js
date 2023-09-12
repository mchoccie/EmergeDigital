import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MessageHeader from "Messaging/MessageHeader";
import Messages from "Messaging/Messages";

const Popup = styled.div`
  overflow: hidden;
  height: 80vh;
  max-height: 450px;
  width: ${(props) => (props.popup ? "92vw" : "100%")};
  border-radius: 20px;
  box-shadow: 0px 0px 1px 1px var(--light-gray);
  background-color: white;

  @media only screen and (min-width: 600px) {
    max-width: ${(props) => (props.popup ? "350px" : "none")};
  }
`;

/**
 *
 * @param {Object} props - props passed into react component
 * @param {String} props.name - name of matched leader/coach
 * @param {Function} props.toggleOpen - function to close popup
 * @param {boolean} props.popup - boolean flag indicating whether to render this
 * component as a popup
 * @param {String} props.recipientId - id of matched leader/coach
 * @returns {JSX} - JSX representing the messaging chatbox
 */
const MessagePopup = ({ name, toggleOpen, popup, recipientId }) => {
  return (
    <Popup popup={popup}>
      <MessageHeader popup={popup} name={name} close={toggleOpen} />
      <Messages recipientId={recipientId} />
    </Popup>
  );
};

MessagePopup.propTypes = {
  name: PropTypes.string,
  toggleOpen: PropTypes.func,
  popup: PropTypes.bool,
  recipientId: PropTypes.string,
};

export default MessagePopup;
