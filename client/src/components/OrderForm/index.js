import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import OptionGroupUnstyled from '@mui/base/OptionGroupUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import { OutlinedInput } from '@mui/material';

import { useQuery } from '@apollo/client';
import { QUERY_DEP_PRODUCTS } from '../../utils/queries';

export default function OrderForm() {
  const { data } = useQuery(QUERY_DEP_PRODUCTS);
  const prodData = data?.departments || [];
  const [rowsState, setRowsState] = useState({ rows: [{ key: 0, name: '', quantity: '', unitPrice: '', total: '' }] });
  const [inputState, setInputState] = useState({ rows: [{ key: 0, name: '', quantity: '', unitPrice: '', total: '' }] });
  // const rows = [
  //   { key: 0 }
  // ];


  const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
  };

  const StyledButton = styled('button')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  height: 4em;
  width: 25vw;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.27em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
  );

  const StyledListbox = styled('ul')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  width: 25vw;
  max-height: 400px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.27em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `,
  );

  const StyledOption = styled(OptionUnstyled)(
    ({ theme }) => `
  list-style: none;
  padding: 4px;
  margin-top: 0;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
  );

  const StyledGroupRoot = styled('li')`
  list-style: none;
`;

  const StyledGroupHeader = styled('span')`
  display: block;
  padding: 15px 0 5px 10px;
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: ${grey[600]};
`;

  const StyledGroupOptions = styled('ul')`
  list-style: none;
  margin-left: 0;
  padding: 0;

  > li {
    padding-left: 20px;
  }
`;

  const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

  function CustomSelect(props) {
    const components = {
      Root: StyledButton,
      Listbox: StyledListbox,
      Popper: StyledPopper,
      ...props.components,
    };

    return <SelectUnstyled {...props} components={components} />;
  }

  CustomSelect.propTypes = {
    /**
     * The components used for each slot inside the Select.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components: PropTypes.shape({
      Listbox: PropTypes.elementType,
      Popper: PropTypes.func,
      Root: PropTypes.elementType,
    }),
  };

  const CustomOptionGroup = React.forwardRef(function CustomOptionGroup(props, ref) {
    const components = {
      Root: StyledGroupRoot,
      Label: StyledGroupHeader,
      List: StyledGroupOptions,
      ...props.components,
    };

    return <OptionGroupUnstyled {...props} ref={ref} components={components} />;
  });

  CustomOptionGroup.propTypes = {
    /**
     * The components used for each slot inside the OptionGroupUnstyled.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components: PropTypes.shape({
      Label: PropTypes.elementType,
      List: PropTypes.elementType,
      Root: PropTypes.elementType,
    }),
  };

  function handleAddBtn(e) {
    const rows = rowsState.rows;
    const key = rows.length;
    const newRow = { key: key, name: '', quantity: '', unitPrice: '', total: '' };
    rows.push({ newRow });
    setRowsState({ ...rowsState, rows });
    // setInputState({ ...inputState, rows });
    console.log(rowsState);
    UnstyledSelectGrouping();
    e.preventDefault();
  }

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRowsState({
      ...rowsState,
      [name]: value,
    });
    console.log(rowsState);
    // try {
    //     const mutationResponse = await login({
    //         variables: { email: formState.email, password: formState.password },
    //     });
    //     const token = mutationResponse.data.login.token;
    //     Auth.login(token);
    //     console.log(token);
    // } catch (e) {
    //     console.log(e);
    // }
  };

  
  function UnstyledSelectGrouping() {
    const handleChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setRowsState({
          ...rowsState,
          [name]: value,
      });
      console.log(rowsState);
    };
    return (
      <>
        {rowsState.rows.map((row) => (
          <TableRow
          onSubmit={handleOrderSubmit}
            key={row.key}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row" >
              {/* {row.product} */}
              <CustomSelect >
                {prodData.map((department) => (
                  <CustomOptionGroup key={row.key} label={department.name}>
                    {department.products.map((product) => (
                      <StyledOption key={row.key} value={product.name}>{product.name}</StyledOption>
                    ))}
                  </CustomOptionGroup>
                ))}
              </CustomSelect>
            </TableCell>
            <TableCell align="right">
              {/* {row.quantity} */}
              <TextField
              key={row.key}
                value={row.quantity}
                onChange={handleChange}
                id="outlined-number"
                type="number"
                sx={{
                  width: '10vw',
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '.27em'
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

            </TableCell>
            <TableCell align="right">
              <OutlinedInput
                onChange={handleChange}
                key={row.key}
                value={row.unitPrice}
                id="outlined-adornment-amount"
                // type="number"
                sx={{
                  width: '10vw',
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '.27em'
                }}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell align="right">
              {/* {row.total} */}
              <TextField
                onChange={handleChange}
                key={row.key}
                value={row.total}
                id="outlined-read-only-input"
                defaultValue=""
                sx={{
                  width: '10vw',
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '.27em'
                }}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }}>{row.unitPrice * row.quantity}</TextField>
            </TableCell>
            <TableCell align="right">
              <button type="submit">Add</button>
            </TableCell>
          </TableRow>
        ))}</>
    );
  }


  return (
    <TableContainer sx={{
      width: '100%',
      marginTop: '10px',
      padding: '10px'
    }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Unit Price</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <UnstyledSelectGrouping />
          <TableRow align="center">
            <TableCell colSpan={6} align="center">
              <button onClick={handleAddBtn}>Add Product</button>
              {/* <button type="submit" onClick={handleOrderSubmit}>Submit Order</button> */}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
