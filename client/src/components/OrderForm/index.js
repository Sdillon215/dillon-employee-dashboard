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
import PorderItem from '../PorderItem';
import { idbPromise } from '../../utils/helpers';
import { ADD_MULTIPLE_TO_PO_CART, UPDATE_CURRENT_DEPARTMENT, UPDATE_DEP_ORDERS } from '../../utils/actions';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




export default function OrderForm() {
    const [state, dispatch] = useStoreContext();
    const { currentDepartment, depOrders } = state;
    useEffect(() => {
        async function getPoCart() {
            const poCart = await idbPromise('poCart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_PO_CART, products: [...poCart] });
        };

        if (!state.poCart.length) {
            getPoCart();
        }
    }, [state.poCart.length, dispatch]);

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

    // function submitCheckout() {
    //     const productIds = [];

    //     state.poCart.forEach((porderItem) => {
    //         for (let i = 0; i < porderItem.purchaseQuantity; i++) {
    //             productIds.push(porderItem._id);
    //         }
    //     });

    //     getCheckout({
    //         variables: { products: productIds }
    //     });
    // };


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = (e) => {
        e.stopPropagation();
        setOpen(false);
    }

    // let modalText = '';

    // if (!rows.length) {
    //     modalText = 'Start Order'
    // }
    // if (rows.length) {
    //     modalText = 'Add porderItem'
    // }

    const handleClick = name => {
        dispatch({
          type: UPDATE_CURRENT_DEPARTMENT,
          currentDepartment: name
        });
      };

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
                        <TableCell align="right">
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{currentDepartment}</InputLabel>
                                    <Select
                                        value={currentDepartment}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Age"
                                    >
                                        {depOrders.map(department => (
                                            <MenuItem 
                                            onClick={() => {
                                                handleClick(department.name)
                                            }}
                                            >{department.name}</MenuItem>
                                        ))}
                                        
                                    </Select>
                                </FormControl>
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.poCart.length ? (
                        <div>
                            {state.poCart.map(porderItem => (
                                <PorderItem key={porderItem._id} porderItem={porderItem} />
                            ))}
                        </div>
                    ) : (
                        <div>no products</div>
                    )}
                    <TableRow align="center">
                        <TableCell colSpan={6} align="center">
                            <Button sx={{ color: 'black', background: 'green' }} type="button" onClick={handleOpen}>
                                {/* {modalText} */}
                                Add To Order
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