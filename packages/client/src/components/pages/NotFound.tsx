import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import CenteredLayout from '../layouts/CenteredLayout/CenteredLayout';
import RedirectMessage from '../features/message/RedirectMessage/RedirectMessage';
import DefaultButton from '../common/DefaultButton/DefaultButton';

const NotFound = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <CenteredLayout>
      <RedirectMessage title="Error 404 :(" text="No match found for:" path={pathname} />
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

export default NotFound;
