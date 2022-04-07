import * as React from 'react';
import { useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ProdSelect from '../ProdSelect';
import { Button } from '@mui/material';
import PorderItem from '../PorderItem';
import { idbPromise } from '../../utils/helpers';
import { ADD_MULTIPLE_TO_PO_CART } from '../../utils/actions';
import DepartmentSelect from '../DepartmentSelect';
import { TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { PO_SUBMIT } from '../../utils/mutations';
import { REMOVE_FROM_PO_CART } from '../../utils/actions';
export default function OrderForm() {
    const [state, dispatch] = useStoreContext();
    const [submitPo, { error }] = useMutation(PO_SUBMIT);
    const { currentDepartment, poCart } = state;
    let depCart = [{productTotal: ''}];
    let total;
    const porderItems = [];

    useEffect(() => {
        async function getPoCart() {
            const poCart = await idbPromise('poCart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_PO_CART, products: [...poCart] });
        };

        if (!poCart.length) {
            getPoCart();
        };
    }, [poCart.length, dispatch]);

    if (currentDepartment) {
        depCart = poCart.filter(porderItem => porderItem.departmentId === currentDepartment._id);
        let porderItemTotals = [];
        for (let i = 0; i < depCart.length; i++) {
            const unitPrice = depCart[i].unitPrice;
            const quantity = depCart[i].quantity;
            let sum = 0;
            sum += unitPrice * quantity;
            const productTotal = sum.toFixed(2);
            depCart[i].productTotal = parseFloat(productTotal);
            porderItemTotals.push(sum);
        };
        const depCartTotal = porderItemTotals.reduce((a, b) => a + b, 0);
        total = parseFloat(depCartTotal.toFixed(2));


        const porder = depCart;
        
        for (let i = 0; i < porder.length; i++) {
            const productId = porder[i]._id;
            const departmentId = porder[i].departmentId;
            const name = porder[i].name;
            const unitPrice = porder[i].unitPrice;
            const quantity = porder[i].quantity;
            const productTotal = porder[i].productTotal;
            porderItems.push({productId, departmentId, name, unitPrice, quantity, productTotal});
            
        };
    }
    
    
    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        
        try {
             await submitPo({
                variables: {
                    departmentId: currentDepartment._id,
                    orderTotal: total,
                    porderItems: [...porderItems],
                }
            })

        } catch (error) {
            console.log(error);
        }

        console.log(depCart);
        for (let i = 0; i < depCart.length; i++) {
            const porderItem = depCart[i];
            console.log(porderItem)
            removeFromCart(porderItem);
        }
    }
    
    const removeFromCart = porderItem => {
        dispatch({
            type: REMOVE_FROM_PO_CART,
            _id: porderItem._id
        });
        idbPromise('poCart', 'delete', { ...porderItem });
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
                            <DepartmentSelect />
                        </TableCell>
                    </TableRow>
                </TableHead>
                {!currentDepartment ? (
                    <TableBody>
                        <TableRow>
                            <TableCell>Please select a department to start a purchase order</TableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                        {depCart.length ? (
                            <>
                                {depCart.map(porderItem => (
                                    <PorderItem key={porderItem._id} porderItem={porderItem} />
                                ))}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell>

                                    no products
                                </TableCell>
                            </TableRow>
                        )}
                        <TableRow>
                                <TableCell
                                    colSpan={12}
                                    align="center"
                                    
                                // calculate total is putting out same total every time fix
                                // 
                                // 
                                // 
                                // fix BUG fix BUG
                                >
                                    <TextField
                                    align="center"
                                    sx={{
                                        width: '10vw',
                                        background: 'rgba(255, 255, 255, 0.6)',
                                        borderRadius: '.27em'
                                    }}
                                    value={total}
                                    ></TextField>
                                    </TableCell>
                        </TableRow>
                        <TableRow>
                            <ProdSelect />
                            <TableCell colSpan={3} align="center">
                                <Button
                                sx={{ color: 'black', background: 'green' }}
                                type="button"
                                onClick={handleOrderSubmit}
                                >
                                    Submit Order
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>
        </TableContainer >
    );
}