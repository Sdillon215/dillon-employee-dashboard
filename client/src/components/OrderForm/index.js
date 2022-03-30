import * as React from 'react';
import { useState, useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { idbPromise } from '../../utils/helpers';
import Table from '@mui/material/Table';
import { Button } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import clsx from 'clsx';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';

import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import OptionGroupUnstyled from '@mui/base/OptionGroupUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { OutlinedInput } from '@mui/material';



export default function OrderForm(props) {
    const [state] = useStoreContext();
    const { depOrders } = state;
    const [formState, setFormState] = useState({ product: '', quantity: '', unitPrice: '' });

    const rows = [{ key: '' }];


    // Order Modal
    const BackdropUnstyled = React.forwardRef((props, ref) => {
        const { open, className, ...other } = props;
        return (
            <div
                className={clsx({ 'MuiBackdrop-open': open }, className)}
                ref={ref}
                {...other}
            />
        );
    });

    BackdropUnstyled.propTypes = {
        className: PropTypes.string.isRequired,
        open: PropTypes.bool,
    };

    const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

    const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;


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

    const StyledButton = styled('textArea')(
        ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  height: 4em;
  width: 20vw;
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
  width: 20vw;
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

    // function handleAddBtn(e) {
    //   const rows = rowsState.rows;
    //   const key = rows.length;
    //   const newRow = { key: key, name: '', quantity: '', unitPrice: '', total: '' };
    //   rows.push({ newRow });
    //   setRowsState({ ...rowsState, rows });
    //   // setInputState({ ...inputState, rows });
    //   console.log(rowsState);
    //   e.preventDefault();
    // }
    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log(name, value);
    };
    

    const handleAddSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        const product = data.get('product');
        const quantString = data.get('quantity');
        const priceString = data.get('unitPrice');
        console.log(product, quantString, priceString);
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = (e) => {
        e.stopPropagation();
        setOpen(false);
    }



    let modalText = '';

    if (!rows.length) {
        modalText = 'Start Order'
    }
    if (rows.length) {
        modalText = 'Add Item'
    }


    const displayPo = rows.map((row, index) => (
        <TableRow
            // onSubmit={handleOrderSubmit}
            key={index}
            sx={{ width: '100%' }}
        >
            <TableCell align="left">
                <TextField
                    id="outlined-read-only-input"
                    inputProps={{ readOnly: true }}
                    sx={{
                        width: '20vw',
                        background: 'rgba(255, 255, 255, 0.6)',
                        borderRadius: '.27em'
                    }} />
            </TableCell>
            <TableCell align="right">
                <TextField
                    key={row.key}
                    value={row.quantity}
                    id="outlined-number"
                    type="number"
                    sx={{
                        width: '10vw',
                        background: 'rgba(255, 255, 255, 0.6)',
                        borderRadius: '.27em'
                    }}
                />

            </TableCell>
            <TableCell align="right">
                <OutlinedInput
                    key={row.key}
                    id="outlined-adornment-amount"
                    sx={{
                        width: '10vw',
                        background: 'rgba(255, 255, 255, 0.6)',
                        borderRadius: '.27em'
                    }}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
            </TableCell>
            <TableCell align="right">
                <TextField
                    key={row.key}
                    value={row.total}
                    id="outlined-read-only-input"
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
        </TableRow>
    ));

    return (
        <TableContainer sx={{
            width: '100%',
            marginTop: '10px',
            padding: '10px'
        }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Product</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Unit Price</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayPo}
                    <TableRow align="center">
                        <TableCell colSpan={6} align="center">

                            <Button sx={{ color: 'black', background: 'green' }} type="button" onClick={handleOpen}>
                                {modalText}
                            </Button>
                            <Modal
                                aria-labelledby="unstyled-modal-title"
                                aria-describedby="unstyled-modal-description"
                                open={open}
                                onClose={handleClose}
                                BackdropComponent={Backdrop}
                            >
                                <Box
                                    component="form"
                                    onSubmit={handleAddSubmit}
                                    sx={{
                                        width: '60vw',
                                        border: '1px solid rgba(255, 255, 255, 0.6)',
                                        borderRadius: '10px',
                                        background: 'rgba(255, 255, 255, .9)'
                                    }}>
                                    <TableContainer sx={{
                                        width: '100%',
                                        marginTop: '10px',
                                        padding: '10px'
                                    }}>
                                        <Table aria-label="simple table" sx={{ width: '100%', padding: '5vw' }}>
                                            <TableHead sx={{ width: '100%' }}>
                                                <TableRow sx={{ width: '100%' }}>
                                                    <TableCell align="left">Product</TableCell>
                                                    <TableCell align="right">Quantity</TableCell>
                                                    <TableCell align="right">Unit Price</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow
                                                    sx={{ width: '100%' }}
                                                >
                                                    <TableCell align="left">
                                                        <CustomSelect
                                                            name="product"
                                                            // // value={props.button}
                                                            // // ref={SelectUnstyled}
                                                            // value={SelectUnstyled.value}
                                                            // // onChange={handleChange}
                                                        >
                                                            {depOrders.map((department) => (
                                                                <CustomOptionGroup 
                                                                key={department.name} 
                                                                label={department.name}>
                                                                    {department.products.map((product, index) => (
                                                                        <StyledOption
                                                                        key={product.name}
                                                                        value={product.name}>{product.name}</StyledOption>
                                                                    ))}
                                                                </CustomOptionGroup>
                                                            ))}
                                                        </CustomSelect>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <TextField
                                                            id="outlined-number"
                                                            name="quantity"
                                                            sx={{
                                                                width: '10vw',
                                                                background: 'rgba(255, 255, 255, 0.6)',
                                                                borderRadius: '.27em'
                                                            }}
                                                        />

                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <OutlinedInput
                                                            id="outlined-adornment-amount"
                                                            name="unitPrice"
                                                            sx={{
                                                                width: '10vw',
                                                                background: 'rgba(255, 255, 255, 0.6)',
                                                                borderRadius: '.27em'
                                                            }}
                                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow align="center" sx={{ width: '100%' }}>
                                                    <TableCell colSpan={6} align="center">
                                                        <button type="submit">Add To Order</button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Modal>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}