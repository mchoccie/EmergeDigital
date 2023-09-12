import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import PropTypes from "prop-types";
import MessageList from "Messaging/MessageList";
import MessageInput from "Messaging/MessageInput";

/**
 * @param {Object} props - props passed into react component
 * @param {String} props.recipientId - id of matched leader/coach
 * @returns {JSX} - JSX representing wrapper for message list and input
 */
const Messages = ({ recipientId }) => {
  const [messages, updateMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [socket, setSocket] = useState(null);
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_BACKEND_URL);
    newSocket.on("getMessage", (data) => {
      updateMessages((messages) => [
        ...messages,
        {
          sender: data.senderId,
          text: data.text,
        },
      ]);
    });
    newSocket.emit("addUser", userState._id);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket, userState._id]);

  // retrieve conversation
  useEffect(() => {
    const getConversation = async () => {
      if (!recipientId) {
        return;
      }
      try {
        const url =
          process.env.REACT_APP_BACKEND_URL +
          "/api/conversation/" +
          recipientId;

        const conversation = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((data) => data.json());

        setConversation(conversation);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [setConversation, recipientId]);

  // retrieve messages for matching conversation
  useEffect(() => {
    const getMessages = async () => {
      if (conversation === null) return;
      try {
        const res = await fetch(
          process.env.REACT_APP_BACKEND_URL +
            "/api/message/" +
            conversation._id,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((data) => data.json());

        updateMessages(res);
      } catch (e) {
        console.log(e);
      }
    };
    getMessages();
  }, [conversation, updateMessages]);

  const addNewMessage = (message) => {
    updateMessages([...messages, message]);
    // Pass through to socket
    // Send through to database
    const saveMessage = async (body) => {
      try {
        await fetch(process.env.REACT_APP_BACKEND_URL + "/api/message", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }).then((data) => data.json());
      } catch (e) {
        console.log(e);
      }
    };

    saveMessage({
      conversationId: conversation._id,
      text: message.text,
    });

    /**
     * Socket.io
     */

    socket.emit("sendMessage", {
      senderId: userState._id,
      receiverId: recipientId,
      text: message.text,
    });
  };

  return (
    <div>
      <MessageList messages={messages} />
      <div>
        <MessageInput
          paired={conversation !== null}
          updateMessages={addNewMessage}
        />
      </div>
    </div>
  );
};

Messages.propTypes = {
  recipientId: PropTypes.string,
};

export default Messages;
