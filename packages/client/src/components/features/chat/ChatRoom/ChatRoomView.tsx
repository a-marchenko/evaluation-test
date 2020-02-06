import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import styles from './ChatRoom.css';

import { Chat, Member, Message } from './ChatRoomTypes';

import ShowMembersButton from '../ShowMembersButton/ShowMembersButton';
import UserFigure from '../../profile/UserFigure/UserFigure';
import CopyJoinLinkButton from '../CopyJoinLinkButton/CopyJoinLinkButton';
import MessageInput from '../MessageInput/MessageInput';
import SendMessageButton from '../SendMessageButton/SendMessageButton';
import MembersModal from '../MembersModal/MembersModal';
import MessagesList from '../MessagesList/MessagesList';
import StreamActionButton from '../StreamActionButton/StreamActionButton';

import { useStore } from '../../../../state/store';
import useModal from '../../../../hooks/useModal';

interface Props {
  chatRoom: Chat;
  members: Member[];
  messages: Message[];
  socket: SocketIOClient.Socket;
  videoRef: React.RefObject<HTMLVideoElement>;
  startStreaming: () => void;
}

interface FormData {
  message: string;
}

const ChatRoomView = (props: Props) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const { handleSubmit, register, errors, reset } = useForm<FormData>({ mode: 'onSubmit' });
  const { state } = useStore();
  const { isShowing, toggle } = useModal();

  // stop streaming
  const stopStreamedVideo = () => {
    if (props.videoRef.current.srcObject) {
      let stream = props.videoRef.current.srcObject as MediaStream;
      let tracks = stream.getTracks();

      tracks.forEach(track => track.stop());

      props.videoRef.current.srcObject = null;

      setIsStreaming(false);
    }
  };

  // start streaming
  const startStreamingVideo = () => {
    setIsStreaming(true);
    props.startStreaming();
  };

  const onSubmit = (data: FormData) => {
    // send messge via socket
    props.socket.emit('message', {
      chatRoomId: props.chatRoom.id,
      senderName: state.name,
      text: data.message,
      createdAt: dayjs().format('DD MMMM HH:mm'),
    });

    // reset field
    reset();
  };

  useEffect(() => {
    return () => stopStreamedVideo();
  }, [props.chatRoom.id]);

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <CopyJoinLinkButton chatToken={props.chatRoom.token} />
        <h4>{props.chatRoom.name}</h4>
        <ShowMembersButton onClick={toggle} />
        <MembersModal isShowing={isShowing} hide={toggle}>
          <h3>Online participants</h3>
          {!!props.members.length
            ? props.members.map(member => (
                <>{member.socketId && <UserFigure name={member.name} />}</>
              ))
            : 'No members yet'}
        </MembersModal>
      </header>
      <main className={styles.main}>
        <section className={styles.main__video}>
          <video autoPlay style={{ width: 280, height: 200 }} ref={props.videoRef}></video>
          {props.chatRoom.owner.name === state.name && (
            <>
              {isStreaming ? (
                <StreamActionButton onClick={stopStreamedVideo} isStreaming />
              ) : (
                <StreamActionButton onClick={startStreamingVideo} />
              )}
            </>
          )}
        </section>
        <section className={styles.main__messages}>
          {!!props.messages.length ? <MessagesList messages={props.messages} /> : 'No messages yet'}
        </section>
      </main>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <MessageInput
          error={errors.message ? errors.message.message : ''}
          register={register({
            required: 'Message cannot be empty',
            maxLength: { value: 200, message: 'Max length is 200 characters' },
          })}
        />
        <SendMessageButton />
      </form>
    </article>
  );
};

export default ChatRoomView;
