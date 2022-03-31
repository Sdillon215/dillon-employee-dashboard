import * as React from 'react';
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
import { ADD_TO_PO_CART, UPDATE_PO_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';




export default function ProductSelect() {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const [state, dispatch] = useStoreContext();
    const { products, poCart } = state;
    const theme = useTheme();
    const [productId, setproductId] = React.useState([]);

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
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

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setproductId(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleAddSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        const productId = data.get('product');
        const addItem = products.find((product) => product._id === productId);
        console.log(addItem);
        const _id = productId;
        const quantity = data.get('quantity');
        const unitPrice = data.get('unitPrice');
        const porderItem = { _id, quantity, unitPrice };
        const itemInCart = poCart.find((porderItem) => porderItem._id === productId)
        if (itemInCart) {
            dispatch({
                type: UPDATE_PO_CART_QUANTITY,
                _id: productId,
                quantity: parseInt(itemInCart.quantity) + 1
            });
            idbPromise('poCart', 'put', {
                ...itemInCart,
                quantity: parseInt(itemInCart.quantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_PO_CART,
                product: porderItem 
            });
            idbPromise('poCart', 'put', porderItem);
        }
    }



    return (
        <>
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
                                    <FormControl sx={{ m: 1, width: 300 }}>
                                        <Select
                                            id="demo-multiple-name"
                                            name="product"
                                            onChange={handleChange}
                                            MenuProps={MenuProps}
                                            input={<OutlinedInput />}
                                        >
                                            {products.map((product) => (
                                                <MenuItem
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
        </>


    );
}
