import React from 'react';
import { clearUserData } from '../../util/localStorage';

const LogoutButton = () => {
  return <button onClick={() => clearUserData()}>Logout</button>
}

export default LogoutButton;