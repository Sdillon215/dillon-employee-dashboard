import * as React from 'react';
import { useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SaleProdSelect from '../ProdSelect';
import { Button } from '@mui/material';
import SorderItem from '../SorderItem';
import { idbPromise } from '../../utils/helpers';
import { ADD_MULTIPLE_TO_SO_CART, REMOVE_FROM_SO_CART } from '../../utils/actions';
import DepartmentSelect from '../DepartmentSelect';
import { useMutation } from '@apollo/client';
import { SO_SUBMIT } from '../../utils/mutations';


export default function SalesOrderForm() {
    const [state, dispatch] = useStoreContext();
    const [submitSo] = useMutation(SO_SUBMIT);
    const { currentDepartment, soCart } = state;
    let depCart = [{ productTotal: '' }];
    let total;
    const sorderItems = [];

    useEffect(() => {
        async function getSoCart() {
            const soCart = await idbPromise('soCart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_SO_CART, products: [...soCart] });
        };

        if (!soCart.length) {
            getSoCart();
        };
    }, [soCart.length, dispatch]);

    if (currentDepartment) {
        depCart = soCart.filter(sorderItem => sorderItem.departmentId === currentDepartment._id);
        let sorderItemTotals = [];
        for (let i = 0; i < depCart.length; i++) {
            const productTotal = depCart[i].productTotal;
            sorderItemTotals.push(productTotal);
        };
        const depCartTotal = sorderItemTotals.reduce((a, b) => a + b, 0);
        total = parseFloat(depCartTotal.toFixed(2));


        const sorder = depCart;

        for (let i = 0; i < sorder.length; i++) {
            const productId = sorder[i]._id;
            const departmentId = sorder[i].departmentId;
            const name = sorder[i].name;
            const unitPrice = sorder[i].unitPrice;
            const quantity = sorder[i].quantity;
            const productTotal = sorder[i].productTotal;
            sorderItems.push({ productId, departmentId, name, unitPrice, quantity, productTotal });

        };
    }


    const handleOrderSubmit = async (e) => {
        e.preventDefault();

        try {
            await submitSo({
                variables: {
                    departmentId: currentDepartment._id,
                    orderTotal: total,
                    sorderItems: [...sorderItems],
                }
            })
        } catch (error) {
            console.log(error);
        };

        for (let i = 0; i < depCart.length; i++) {
            const sorderItem = depCart[i];
            removeFromCart(sorderItem);
        };
    };

    const removeFromCart = sorderItem => {
        dispatch({
            type: REMOVE_FROM_SO_CART,
            _id: sorderItem._id
        });
        idbPromise('soCart', 'delete', { ...sorderItem });
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
                        <TableCell colSpan={12} align="center">Sale Order</TableCell>
                    </TableRow>
                    <TableRow>
                        {!currentDepartment ? (
                            <TableCell align={'center'} colSpan={6}>Please select a department to start a sale order </TableCell>
                        ) : (
                            <>
                                <TableCell align="left">Product</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell sx={{ minWidth: '69px' }} align="right">Unit Price</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </>
                        )}
                        <TableCell align="right">
                            <DepartmentSelect />
                        </TableCell>
                    </TableRow>
                </TableHead>
                {!currentDepartment ? (
                    <></>
                ) : (
                    <TableBody>
                        {depCart.length ? (
                            <>
                                {depCart.map(sorderItem => (
                                    <SorderItem key={sorderItem._id} sorderItem={sorderItem} />
                                ))}
                            </>
                        ) : (
                            <></>
                        )}
                        <TableRow align="center">
                            {depCart.length ? (
                                <>
                                    <TableCell
                                        colSpan={1}
                                        align="left">
                                        Sale Order Total:
                                    </TableCell>
                                    <TableCell
                                        colSpan={1}
                                        align="right">
                                        ${total}
                                    </TableCell>
                                    <TableCell colSpan={1}></TableCell>
                                    <TableCell colSpan={2} align="right">
                                        <SaleProdSelect />
                                        <Button
                                            sx={{ color: 'black', background: 'rgb(27, 131, 85)', width: '10vw', marginLeft: '26px' }}
                                            type="button"
                                            onClick={handleOrderSubmit}
                                        >
                                            Submit Order
                                        </Button>
                                    </TableCell>
                                </>
                            ) : (
                                <TableCell colSpan={12} align="center">
                                    <SaleProdSelect />
                                </TableCell>
                            )}
                        </TableRow>
                    </TableBody>
                )}
            </Table>
        </TableContainer >
    );
}