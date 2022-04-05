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

import PorderItem from '../PorderItem';
import { idbPromise } from '../../utils/helpers';
import { ADD_MULTIPLE_TO_PO_CART } from '../../utils/actions';
import DepartmentSelect from '../DepartmentSelect';



export default function OrderForm() {
    const [state, dispatch] = useStoreContext();
    const { currentDepartment, poCart } = state;
    let depCart;
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
        depCart = poCart.filter(porderItem => porderItem.depId === currentDepartment._id);
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
                    <TableRow align="center">
                        <ProdSelect />
                    </TableRow>
                </TableBody>
                )}
            </Table>
        </TableContainer >
    );
}