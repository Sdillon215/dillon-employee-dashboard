import * as React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { REMOVE_FROM_PO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';




export default function PorderItem({ porderItem }) {
    const [state, dispatch] = useStoreContext();

    const removeFromCart = item => {
        dispatch({
            type: REMOVE_FROM_PO_CART,
            _id: item._id
        });
        idbPromise('cart', 'delete', { ...item });
    };

    function calculateTotal() {
        let sum = 0;
        state.poCart.forEach(porderItem => {
            sum += porderItem.unitPrice * porderItem.quantity;
        });
        return sum.toFixed(2);
    };

    return (
        <TableRow
            sx={{ width: '100%' }}
        >
            <TableCell
                align="left"
                sx={{
                    width: '20vw',
                    background: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '.27em'
                }}>
                {porderItem.name}
            </TableCell>
            <TableCell
                align="right"
                sx={{
                    width: '10vw',
                    background: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '.27em'
                }}
            >{porderItem.quantity}</TableCell>
            <TableCell
                align="right"
                sx={{
                    width: '10vw',
                    background: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '.27em'
                }}
            >${porderItem.unitPrice}</TableCell>
            <TableCell
                align="right"
                sx={{
                    width: '10vw',
                    background: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '.27em'
                }}
            >${calculateTotal()}</TableCell>
            <span
                role="img"
                aria-label="trash"
                onClick={() => removeFromCart(porderItem)}
            >
                🗑️
            </span>
        </TableRow>
    );
}