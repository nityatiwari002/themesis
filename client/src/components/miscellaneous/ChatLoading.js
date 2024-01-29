import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';


const chatLoading = () => {
    return (
      <Stack gap={3}>
      <div className="p-2">User 1</div>
      <div className="p-2">User 2</div>
      <div className="p-2">User 3</div>
      <div className="p-2">User 1</div>
      <div className="p-2">User 2</div>
      <div className="p-2">User 3</div>
    </Stack>
      );
}

export default chatLoading
