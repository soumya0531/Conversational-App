import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Form, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { IconContext } from "react-icons";
import io from 'socket.io-client';
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
  width: 90%;
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


let bufferSize = 2048,
	context,
	processor,
	input,
	globalStream

const downsampleBuffer = (buffer, sampleRate, outSampleRate) => {
	if (outSampleRate === sampleRate) {
		return buffer
	}
	if (outSampleRate > sampleRate) {
		throw new Error('downsampling rate show be smaller than original sample rate')
	}
	var sampleRateRatio = sampleRate / outSampleRate
	var newLength = Math.round(buffer.length / sampleRateRatio)
	var result = new Int16Array(newLength)
	var offsetResult = 0
	var offsetBuffer = 0
	while (offsetResult < result.length) {
		var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio)
		var accum = 0, count = 0
		for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
			accum += buffer[i]
			count++
		}

		result[offsetResult] = Math.min(1, accum / count) * 0x7FFF
		offsetResult++
		offsetBuffer = nextOffsetBuffer
	}
	return result.buffer
}

const InputBar = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const socket = useRef(null);
  const [transcript, setTranscript] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  useEffect(() => {
    setupSocket()
  }, []);

  const setupSocket = () => {
    console.log("hello");
    socket.current = io('https://converstaional-app-speech.herokuapp.com/', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
    })

    socket.current.on('connect', () => {
      console.log('connected')
    })

    socket.current.on('data', (data) => {
      console.log(data);
      setTranscript(data)
    })
  }

  const setup = async () => {
    context = new (window.AudioContext || window.webkitAudioContext)({
      latencyHint: 'interactive',
    })
    processor = context.createScriptProcessor(bufferSize, 1, 1)
    processor.connect(context.destination)
    context.resume()

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    globalStream = stream
    input = context.createMediaStreamSource(stream)
    input.connect(processor)

    processor.onaudioprocess = (e) => {
      microphoneProcess(e)
    }
  }

  const microphoneProcess = (e) => {
    var left = e.inputBuffer.getChannelData(0)
    var left16 = downsampleBuffer(left, 44100, 16000)
    socket.current.emit('stream', left16)
  }

  const start = () => {
    setup();
    setIsStreaming(true);
    console.log("voice started");
        

  }

  const stop = () => {
    if (isStreaming) {
      // stop record track from browser
      let track = globalStream.getTracks()[0]
      track.stop();
      console.log("voice deactivated");

      // stop recorder from browser
      input.disconnect(processor)
      processor.disconnect(context.destination)
      context.close().then(() => {
        input = null
        processor = null
        context = null
        socket.current.emit('stop')
      })

      setIsStreaming(false);
      setMessage(transcript);
      console.log(message);
    }
  }


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
      setTranscript("");
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
            innerRef={socket}
          />
          <InputGroupAddon addonType="append">
            <SendButton type="submit">
              <IconContext.Provider value={{ color: ButtonColor }}>
                <FaPaperPlane />
              </IconContext.Provider>
            </SendButton>
          </InputGroupAddon>
          {isStreaming ? (
            <InputGroupAddon addonType="append">
            <SpeakButton onClick={stop}>
              <IconContext.Provider value={{ color: ButtonColor }}>
              <FaAssistiveListeningSystems />

              </IconContext.Provider>
            </SpeakButton>
          </InputGroupAddon>
          ) : (
            <InputGroupAddon addonType="append">
            <SpeakButton onClick={start}>
              <IconContext.Provider value={{ color: ButtonColor }}>
                
                  <FaMicrophoneAlt />
              </IconContext.Provider>
            </SpeakButton>
          </InputGroupAddon>
          
          )}
        </InputGroup>
      </Form>
    </Wrapper>
  );
};

export default InputBar;
