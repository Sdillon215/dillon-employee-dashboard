import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useLazyQuery } from '@apollo/client';

import { QUERY_ALL_DEPARTMENTS } from '../../utils/queries';



export default function GraphInput() {
  // const [inputState, setInputState] = useState([])
  const [populateGraph, { loading, data }] = useLazyQuery(QUERY_ALL_DEPARTMENTS);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  const names = [
    'Fresh Cut',
    'Plant Kingdom',
    'Supply'
  ];
  
  function getStyles(name, department, theme) {
    return {
      fontWeight:
      department.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();
  const [department, setDepartment] = React.useState(['Fresh Cut']);

  const handleChange = (event) => {
  event.preventDefault();

    const {
      target: { value },
    } = event;
    setDepartment(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <div>
      <FormControl sx={{ m: 2, width: '50%' }}>
        <InputLabel id="demo-multiple-chip-label">Departments</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={department}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'no-wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, department, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}