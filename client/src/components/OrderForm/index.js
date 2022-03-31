import * as React from 'react';
import { useState, useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ProdSelect from '../ProdSelect';
import { Button } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import clsx from 'clsx';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';



export default function OrderForm(props) {
    const [state] = useStoreContext();
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
                                <ProdSelect />
                            </Modal>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer >
    );
}