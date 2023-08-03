export let mediaRecorder = null;

// 오디오 허용
export const getAudioAllow = async () => {
  try {
    const mediaStream = await window.navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const mediaRecorder = new MediaRecorder(mediaStream, {
      audio: true,
    });
    return mediaRecorder;
  } catch (e) {
    console.error(e);
  }
};

// 웹 소켓 - 말하기 핸들링
export const handleSpeak = async (setTranscript) => {
  if (mediaRecorder) {
    const socket = new WebSocket(
      "wss://api.deepgram.com/v1/listen?language=ko",
      ["token", process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY]
    );
    console.log(socket);
    socket.onopen = () => {
      mediaRecorder.addEventListener("dataavailable", async (event) => {
        if (event.data.size > 0 && socket.readyState == 1) {
          socket.send(event.data);
        }
      });
      mediaRecorder.start(500);
    };

    socket.onmessage = (message) => {
      const received = JSON.parse(message.data);
      const transcript = received.channel.alternatives[0].transcript;
      if (transcript && received.is_final) {
        console.log(transcript);
        setTranscript(transcript);
      }
    };
    socket.onclose = () => {
      console.log("Connection Closed.");
    };
  }
};

// DeepGram AI 말하기 함수
export const handleGetAudio = async (setTranscript) => {
  mediaRecorder = await getAudioAllow();
  await handleSpeak(setTranscript);
};
