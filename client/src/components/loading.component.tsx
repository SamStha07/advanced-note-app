import React from 'react';
import { Spinner } from '../assets';

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20vh',
      }}
    >
      <img src={Spinner} alt='spinner' />
    </div>
  );
};

export default Loading;
