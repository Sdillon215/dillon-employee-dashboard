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
import { ADD_MULTIPLE_TO_PO_CART, REMOVE_FROM_PO_CART, UPDATE_DEPARTMENT_PO } from '../../utils/actions';
import DepartmentSelect from '../DepartmentSelect';
import { useMutation, useLazyQuery } from '@apollo/client';
import { PO_SUBMIT } from '../../utils/mutations';
// import { QUERY_DEP } from '../../utils/queries';


export default function OrderForm() {
    const [state, dispatch] = useStoreContext();
    const [submitPo] = useMutation(PO_SUBMIT);
    // const [getDep, { data }] = useLazyQuery(QUERY_DEP);
    const { currentDepartment, poCart, departments } = state;
    let depCart = [{ productTotal: '' }];
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
            const productTotal = depCart[i].productTotal;
            porderItemTotals.push(productTotal);
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
            porderItems.push({ productId, departmentId, name, unitPrice, quantity, productTotal });

        };
    }


    const handleOrderSubmit = async (e) => {
        e.preventDefault();

        try {
            const mutationResponse = await submitPo({
                variables: {
                    departmentId: currentDepartment._id,
                    orderTotal: total,
                    porderItems: [...porderItems],
                }
            })

            console.log(mutationResponse.data.department);
        } catch (error) {
            console.log(error);
        };

        for (let i = 0; i < depCart.length; i++) {
            const porderItem = depCart[i];
            removeFromCart(porderItem);
        };
        
        // try {
        //     await getDep({ variables: { _id: currentDepartment._id} });
        // } catch (error) {
        //     console.log(error);
        // };
        
        // if (data) {
        //     console.log(data)
        // }
        // const newPo = departments.find((department) => department._id === currentDepartment._id);
        // if (newPo) {
        //     dispatch({
        //         type: UPDATE_DEPARTMENT_PO,
        //         _id: currentDepartment._id,
        //         porder: {
        //             departmentId: currentDepartment._id,
        //             orderTotal: total,
        //             porderItems: [{...porderItems}],
        //         }
        //       });
        // }

    };

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
                        <TableCell colSpan={12} align="center">Purchase Order</TableCell>
                    </TableRow>
                    <TableRow>
                        {!currentDepartment ? (
                            <TableCell align={'center'} colSpan={6}>Please select a department to start a purchase order </TableCell>
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
                                {depCart.map(porderItem => (
                                    <PorderItem key={porderItem._id} porderItem={porderItem} />
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
                                    Purchase Order Total:
                                </TableCell>
                                <TableCell
                                    colSpan={1}
                                    align="right">
                                    ${total}
                                </TableCell>
                                <TableCell colSpan={1}></TableCell>
                                {/* <TableCell colSpan={1}></TableCell> */}
                                <TableCell colSpan={2} align="right">
                                    <ProdSelect />
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
                                <ProdSelect />
                            </TableCell>
                        )}
                            </TableRow>
                    </TableBody>
                )}
            </Table>
        </TableContainer >
    );
}