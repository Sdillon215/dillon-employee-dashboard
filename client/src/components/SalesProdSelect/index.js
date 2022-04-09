import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useStoreContext } from '../../utils/GlobalState';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Box } from '@mui/system';
import { ADD_TO_SO_CART, UPDATE_SO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { Button } from '@mui/material';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import clsx from 'clsx';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';



export default function SaleProductSelect() {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const [state, dispatch] = useStoreContext();
    const { products, soCart, currentDepartment } = state;
    const theme = useTheme();
    const [productId, setproductId] = useState(['']);
    const [formState, setFormState] = useState({ inventory: '', quantity: '' });
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 215,
            },
        },
    };

    function getStyles(product, productId, theme) {
        return {
            fontWeight:
                productId.indexOf(product) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    let curInv;
    const handleChange = (event) => {
        const {
            target: { name, value },
        } = event;
        setproductId(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        // const prodId = value;
        // handleInvChange(prodId);
    };
    
    // const handleInvChange = (e) => {
    //     if (typeof e === 'string') {
    //         console.log(e)
    //         const curProd = products.find((product) => product._id === e);
    //         curInv = curProd.invQuantity;
            
    //         console.log(curInv)
    //         setFormState({
    //             ...formState,
    //             inventory: curInv,
    //             quantity: ''
    //          });


    //     } else {
    //         const {
    //             target: { name, value },
    //         } = e;
    //         // console.log(e.target.value)
    //         // const newInv = formState.inventory - e.target.value;
    //         // console.log(newInv)
    //         setFormState({
    //             ...formState,
    //             [name]: value,
    //          });
    //     }
    //     // const invChg = curProdInv.inv - parseInt(value);
    //     // console.log(curProdInv.inv, '-', value, '=', invChg)
    //     // setProdInv({inv: invChg});
    //     // if (tacos) {
    //     //     }
    // };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const departmentId = currentDepartment._id;
        const productId = data.get('product');
        const addItem = products.find((product) => product._id === productId);
        const name = addItem.name;
        const _id = productId;
        const stringQuantity = data.get('quantity');
        const stringUnitPrice = data.get('unitPrice');
        const quantity = parseInt(stringQuantity);
        const unitPrice = parseFloat(stringUnitPrice);
        const total = quantity * unitPrice;
        const productTotal = parseFloat(total.toFixed(2));
        const sorderItem = { _id, departmentId, name, quantity, unitPrice, productTotal };
        const itemInCart = soCart.find((sorderItem) => sorderItem._id === productId)
        if (itemInCart) {
            dispatch({
                type: UPDATE_SO_CART,
                _id: productId,
                quantity: quantity,
                unitPrice: unitPrice,
                productTotal: productTotal
            });
            idbPromise('soCart', 'put', {
                ...itemInCart,
                quantity: itemInCart.quantity
            });
        } else {
            dispatch({
                type: ADD_TO_SO_CART,
                product: sorderItem
            });
            idbPromise('soCart', 'put', sorderItem);
        }
        handleClose();
    }

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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = (e) => {
        setOpen(false);
    }

    return (
        <>
            <Button sx={{ color: 'black', background: 'rgb(27, 131, 85)', width: '10vw' }}
                onClick={handleOpen}>
                Add Product
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
                        width: '65vw',
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
                                    <TableCell align="right">Inventory</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Unit Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    sx={{ width: '100%' }}
                                >
                                    <TableCell align="left">
                                        <FormControl sx={{ m: 1, width: 215 }}>
                                            <Select
                                                id="demo-multiple-name"
                                                name="product"
                                                onChange={handleChange}
                                                MenuProps={MenuProps}
                                                input={<OutlinedInput />}
                                                value={productId}
                                            >
                                                {products.map((product) => (
                                                    <MenuItem
                                                        key={product._id}
                                                        value={product._id}
                                                        style={getStyles(product, productId, theme)}
                                                    >
                                                        {product.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align="right">
                                        <TextField
                                            id="outlined-number"
                                            name="inventory"
                                            type="text"
                                            sx={{
                                                width: '10vw',
                                                background: 'rgba(255, 255, 255, 0.6)',
                                                borderRadius: '.27em'
                                            }}
                                            value={formState.inventory}
                                            onChange={handleChange} 
                                            />
                                    </TableCell>
                                    <TableCell align="right">
                                        <TextField
                                            id="outlined-number"
                                            name="quantity"
                                            type="text"
                                            sx={{
                                                width: '10vw',
                                                background: 'rgba(255, 255, 255, 0.6)',
                                                borderRadius: '.27em'
                                            }}
                                            value={formState.quantity}
                                            onChange={handleChange}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            name="unitPrice"
                                            type="float"
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
        </>
    );
}