import React from 'react';

const TableContainer: React.FC<any> = ({ title, children }) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ marginBottom: '16px' }}>{title}</h2>
      <div
        style={{
          border: '1px solid #f0f0f0',
          borderRadius: '8px',
          padding: '24px',
          backgroundColor: '#fff',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>{children}</div>
      </div>
    </div>
  );
};

export default TableContainer;
