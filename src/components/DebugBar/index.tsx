import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useCallback, useContext, useMemo } from 'react';

import { PageStatuses } from '../../pages/types';

import { ContextApp } from '../../state/context';
import { ActionTypes } from '../../state/types';

export const DebugBar = () => {
  const { dispatch } = useContext(ContextApp);

  const handleChange = useCallback((event: SelectChangeEvent) => {
    const status = event.target.value;
    dispatch({ type: ActionTypes.CHANGE_STATUS, payload: status });
  }, []);

  return useMemo(
    () => (
      <Box
        sx={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '300px',
          height: '60px',
        }}
      >
        <Select
          defaultValue={Object.values(PageStatuses)[0]}
          onChange={handleChange}
        >
          {Object.values(PageStatuses).map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </Box>
    ),
    [],
  );
};
