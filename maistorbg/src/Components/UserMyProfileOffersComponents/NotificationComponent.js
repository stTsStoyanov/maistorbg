import React, { useMemo } from 'react';

function NotificationComponent({ number }) {
  const circleStyle = useMemo(() => ({
    borderRadius: '50%',
    backgroundColor: '#DEE2E6',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '32px',
    color: '#343A40',
    fontWeight: 'bold',
    position: 'absolute',
    top: '0px',
    right: '15%'
  }), []);

  return (
    <div className="circle" style={circleStyle}>
      <span>{number}</span>
    </div>
  );
}

export default NotificationComponent;
