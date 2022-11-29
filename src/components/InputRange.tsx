import { memo } from 'react';
import Box from '@mui/material/Box';

type InputRangeProps = {
  value: number;
  increaseHandler: VoidFunction;
  decreaseHandler: VoidFunction;
};

const InputRange = ({
  value,
  increaseHandler,
  decreaseHandler,
}: InputRangeProps) => {
  return (
    <Box
      component="div"
      sx={{
        borderRadius: 2,
        bgcolor: 'white',
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span>{value}</span>
      <Box
        component="div"
        sx={{
          borderRadius: 2,
          bgcolor: 'rgba(118, 118, 128, 0.12)',
          padding: '2px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            fontSize: '30px',
            lineHeight: '30px',
            fontWeight: 600,
            width: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={increaseHandler}
        >
          +
        </div>
        <div
          style={{
            fontSize: '30px',
            lineHeight: '30px',
            fontWeight: 600,
            width: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={decreaseHandler}
        >
          -
        </div>
      </Box>
    </Box>
  );
};

export default memo(InputRange);
