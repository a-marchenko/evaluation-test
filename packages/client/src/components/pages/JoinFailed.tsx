import React from 'react';
import { useHistory } from 'react-router-dom';

import CenteredLayout from '../layouts/CenteredLayout/CenteredLayout';
import DefaultMessage from '../features/message/DefaultMessage/DefaultMessage';
import DefaultButton from '../common/DefaultButton/DefaultButton';

import useQuery from '../../hooks/useQuery';

const JoinFailed = () => {
  const history = useHistory();
  const query = useQuery();

  let message = decodeURI(query.get('message'));

  if (message === 'null') {
    message = 'No message.';
  }

  return (
    <CenteredLayout>
      <DefaultMessage title="Failed to join chat :(" text={message} />
      <DefaultButton
        type="button"
        text="Go to homepage"
        onClick={() => history.push('/home')}
        width={240}
        isPrimary
      />
    </CenteredLayout>
  );
};

export default JoinFailed;
