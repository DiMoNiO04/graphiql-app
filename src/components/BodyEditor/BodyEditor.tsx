import { TextareaAutosize } from '@mui/material';

const BodyEditor = () => {
  return (
    <TextareaAutosize
      style={{
        width: 700,
        height: 300,
        padding: '12px 16px',
      }}
    />
  );
};

export default BodyEditor;
