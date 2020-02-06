import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import styles from './AddChatRoomForm.css';

import FormInput from '../../../common/FormInput/FormInput';
import DefaultButton from '../../../common/DefaultButton/DefaultButton';

import { useStore } from '../../../../state/store';

interface Props {
  hide: React.MouseEventHandler;
}

interface FormData {
  name: string;
}

const AddChatRoomForm = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>();
  const { register, handleSubmit, errors } = useForm<FormData>({ mode: 'onBlur' });
  const history = useHistory();
  const { state, dispatch } = useStore();

  const onSubmit = async (data: FormData) => {
    setSubmitError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat_rooms/new', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: `Bearer ${state.accessToken}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.ok && result.chatId) {
        let newChatRooms = state.chatRooms.concat([{ id: result.chatId, name: data.name }]);

        dispatch({ type: 'UPDATE_CHAT_ROOMS', chatRooms: newChatRooms });
        dispatch({ type: 'UPDATE_TOGGLED_CHAT_ID', toggledChatId: result.chatId });

        history.push(`/chat/${result.chatId}`);

        props.hide(null);
      } else if (result.message) {
        setIsLoading(false);
        setSubmitError(result.message);
      } else {
        setIsLoading(false);
        setSubmitError('Something went wrong :(');
      }
    } catch (err) {
      setIsLoading(false);
      setSubmitError(err.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {submitError && <span className={styles.form__error}>{submitError}</span>}
      <FormInput
        placeholder="Name"
        name="name"
        type="text"
        error={errors.name ? errors.name.message : ''}
        register={register({
          required: 'Name is required',
        })}
      />
      <DefaultButton type="submit" text="Create" isLoading={isLoading} isPrimary />
    </form>
  );
};

export default AddChatRoomForm;
