import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import dayjs from 'dayjs';

import ChatRoomView from './ChatRoomView';

import { Chat, Member, Message } from './ChatRoomTypes';
import { useStore } from '../../../../state/store';

// global socket, video, config
const config: RTCConfiguration = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302'],
    },
  ],
};
const peerConnections = {};
let peerConnection: RTCPeerConnection;
let socket: SocketIOClient.Socket;

interface Props {
  chatId: number;
}

const ChatRoom = (props: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [chatRoom, setChatRoom] = useState<Chat>();
  const [members, setMembers] = useState<Member[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const { state, dispatch } = useStore();
  const videoRef = useRef<HTMLVideoElement>();

  useEffect(() => {
    socket = io();

    return () => {
      if (videoRef.current.srcObject) {
        let stream = videoRef.current.srcObject as MediaStream;
        let tracks = stream.getTracks();

        tracks.forEach(track => track.stop());

        videoRef.current.srcObject = null;
      }

      socket.close();
    };
  }, []);

  useEffect(() => {
    dispatch({ type: 'UPDATE_TOGGLED_CHAT_ID', toggledChatId: props.chatId });

    const fetchChatRoom = async () => {
      try {
        // try to get chat with given id
        const response = await fetch(`/api/chat_rooms/${props.chatId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            authorization: `Bearer ${state.accessToken}`,
          },
        });

        const result = await response.json();

        if (result.ok && result.chatRoom) {
          setChatRoom(result.chatRoom);

          if (result.chatRoom.messages && result.chatRoom.messages.length) {
            let messages = result.chatRoom.messages.map(message => {
              return {
                chatRoomId: result.chatRoom.id,
                senderName: message.sender.name,
                text: message.text,
                createdAt: dayjs(message.created_at).format('DD MMMM HH:mm'),
              };
            });
            setMessages(messages);

            // connect to socket io
            io.connect('https://localhost:5000');

            // setup viewer handlers if user is not owner of the room
            if (result.chatRoom.owner.name !== state.name) {
              window.onunload = window.onbeforeunload = () => {
                socket.close();
              };

              socket.on('offer', (id, description) => {
                peerConnection = new RTCPeerConnection(config);

                peerConnection
                  .setRemoteDescription(description)
                  .then(() => peerConnection.createAnswer())
                  .then(sdp => peerConnection.setLocalDescription(sdp))
                  .then(function() {
                    socket.emit('answer', id, peerConnection.localDescription);
                  });

                peerConnection.ontrack = event => {
                  videoRef.current.srcObject = event.streams[0];
                };

                peerConnection.onicecandidate = event => {
                  if (event.candidate) {
                    socket.emit('candidate', id, event.candidate);
                  }
                };
              });

              socket.on('candidate', (id, candidate) => {
                peerConnection
                  .addIceCandidate(new RTCIceCandidate(candidate))
                  .catch(e => console.error(e));
              });

              socket.on('connect', () => {
                socket.emit('watcher');
              });

              socket.on('broadcaster', () => {
                socket.emit('watcher');
              });

              socket.on('bye', () => {
                peerConnection.close();
              });
            }
          } else {
            setMessages([]);
          }

          socket.emit('join', { room: result.chatRoom.id, name: state.name }, error => {
            if (error) {
              console.log(error);
            }
          });

          console.log(members);
          socket.on('join', ({ name, activeUsers }) => {
            console.log(name + ' joined');
            const membersUpdated = activeUsers.filter(user => user.room === props.chatId);
            setMembers(membersUpdated);
          });

          socket.on('exit', ({ name, activeUsers }) => {
            console.log(name + ' exited');
            const membersUpdated = activeUsers.filter(user => user.room === props.chatId);
            setMembers(membersUpdated);
          });

          socket.on('remove-user', ({ socketId }) => {
            const membersUpdated = members.map(member => {
              if (member.socketId === socketId) {
                member.socketId = undefined;
              }
              return member;
            });
            setMembers(membersUpdated);
          });
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchChatRoom();

    return () => {
      socket.emit('exit', { room: props.chatId, name: state.name }, error => {
        if (error) {
          console.log(error);
        }
      });
    };
  }, [props.chatId]);

  useEffect(() => {
    // update messages
    socket.on('message', message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  // start to broadcast video stream
  const startStreaming = () => {
    const constraints: MediaStreamConstraints = {
      audio: true,
      video: { facingMode: 'user' },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        videoRef.current.srcObject = stream;
        socket.emit('broadcaster');
      })
      .catch(error => console.error(error));

    socket.on('answer', (id, description) => {
      peerConnections[id].setRemoteDescription(description);
    });

    socket.on('watcher', id => {
      const peerConnection = new RTCPeerConnection(config);

      peerConnections[id] = peerConnection;

      let stream: MediaStream = videoRef.current.srcObject as MediaStream;

      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

      peerConnection
        .createOffer()
        .then(sdp => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit('offer', id, peerConnection.localDescription);
        });

      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          socket.emit('candidate', id, event.candidate);
        }
      };
    });
  };

  return (
    <>
      {chatRoom ? (
        <ChatRoomView
          chatRoom={chatRoom}
          members={members}
          messages={messages}
          socket={socket}
          videoRef={videoRef}
          startStreaming={startStreaming}
        />
      ) : (
        <h2>{error}</h2>
      )}
    </>
  );
};

export default ChatRoom;
