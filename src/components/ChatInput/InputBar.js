import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Form, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { IconContext } from "react-icons";
import {
  FaRedo,
  FaPaperPlane,
  FaMicrophoneAlt,
  FaAssistiveListeningSystems,
} from "react-icons/fa";
import useSound from "use-sound";
import hel from "../../audioclip/Blop.mp3";


import { sendMessage, clearMessage } from "../../redux/actions/messageAction";

const ButtonColor = `#393939`;
const Border = `1px solid ${ButtonColor}`;

const Wrapper = styled.div`
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.4);
  border-radius: 50px;
  width: 70%;
  margin: auto;
`;

const StyledInput = styled(Input)`
  border: ${Border};
  &:active,
  &:focus {
    box-shadow: inset 0 0 0 ${ButtonColor};
    border-color: ${ButtonColor};
    z-index: 1 !important;
  }
`;

const BaseButton = styled(Button)`
  background-color: #fff;
  border: ${Border};
  &:hover {
    background-color: #fff;
  }
  &:active,
  &:focus {
    background-color: #fff;
    box-shadow: none !important;
    border-color: ${ButtonColor} !important;
  }
  &:active {
    background-color: #ccc !important;
  }
`;

const SendButton = styled(BaseButton)`
  border-left: 0px;
`;

const ResetButton = styled(BaseButton)`
  border-radius: 50px 0 0 50px !important;
`;

const SpeakButton = styled(BaseButton)`
  border-radius: 0 50px 50px 0 !important;
`;

// Find out if SpeechRecognition exists in the browser window
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// Initialize the API if exists, else set it to null
const recognition =
  SpeechRecognition === undefined ? null : new SpeechRecognition();

const InputBar = ({ hideInput }) => {
  const dispatch = useDispatch();
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    // Check the `recognition` variable and set support accordingly.
    if (recognition === null) setSupported(false);
    else setSupported(true);
    // Focus on the input
    inputRef.current.focus();
  }, []);

  // useEffect for listening status
  useEffect(() => {
    if (listening) {
      recognition.start();
    } else {
      recognition.stop();
    }
  }, [listening]);

  const handleListen = () => {
    // If the API is supported on the browser
    if (supported) {
      if (listening) {
        // If already listening, stop the speech recognition
        setListening(false);
      } else {
        // Otherwise, start listening for speech
        setListening(true);
        recognition.onstart = () => console.log("Voice activated");
        recognition.onresult = (e) => {
          // Get the speech result of highest confidence and set it to input bar
          const result = e.results[e.resultIndex][0].transcript.trim();
          console.log("Recognition Result: ", result);
          setMessage(result);
        };
        // When speech ends, automatically stop the recognition
        recognition.onspeechend = () => {
          console.log("Voice stopped");
          setListening(false);
        };
      }
      // If not supported, display an alert
    } else {
      alert("Sorry, WebSpeechAPI currently works only on Chrome and Edge.");
    }
  };

  //Check if message is empty or not
  const handleValidation = () => {
    return message.length > 0;
  };

  // Reset Chat
  const handleReset = () => {
    dispatch(clearMessage());
  };

  // Send Message on Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && handleValidation()) {
      handleSubmit(e);
    }
  };
  const [play] = useSound(hel, {volume: 0.5});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch(sendMessage(message));
      setMessage("");
      play();
    } else {
      alert("Please enter something!");
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <InputGroup size="lg">
          <InputGroupAddon addonType="prepend">
            <ResetButton onClick={() => handleReset()}>
              <IconContext.Provider
                value={{ color: ButtonColor, size: "14px" }}
              >
                <FaRedo />
              </IconContext.Provider>
            </ResetButton>
          </InputGroupAddon>
          <StyledInput
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type here... "
            onKeyDown={(e) => handleKeyDown(e)}
            onDoubleClick={() => hideInput()}
            innerRef={inputRef}
          />
          <InputGroupAddon addonType="append">
            <SendButton type="submit">
              <IconContext.Provider value={{ color: ButtonColor }}>
                <FaPaperPlane />
              </IconContext.Provider>
            </SendButton>
          </InputGroupAddon>
          <InputGroupAddon addonType="append">
            <SpeakButton onClick={() => handleListen()}>
              <IconContext.Provider value={{ color: ButtonColor }}>
                {listening ? (
                  <FaAssistiveListeningSystems />
                ) : (
                  <FaMicrophoneAlt />
                )}
              </IconContext.Provider>
            </SpeakButton>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    </Wrapper>
  );
};

InputBar.propTypes = {
  hideInput: PropTypes.func.isRequired,
};

export default InputBar;
