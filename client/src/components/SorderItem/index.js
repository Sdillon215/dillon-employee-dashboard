import * as React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import TableCell from '@mui/material/TableCell';
import { Button } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { REMOVE_FROM_SO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';




export default function SorderItem({ sorderItem }) {
    const [state, dispatch] = useStoreContext();

    const removeFromCart = sorderItem => {
        dispatch({
            type: REMOVE_FROM_SO_CART,
            _id: sorderItem._id
        });
        idbPromise('soCart', 'delete', { ...sorderItem });
    };

    return (
        <TableRow
            sx={{ width: '100%' }}
        >
            <TableCell
                align="left">
                {sorderItem.name}
            </TableCell>
            <TableCell
                align="right">{sorderItem.quantity}</TableCell>
            <TableCell
                align="right">${sorderItem.unitPrice}</TableCell>
            <TableCell
                align="right">${sorderItem.productTotal}</TableCell>
            <TableCell align="right">
                <Button
                    sx={{ color: 'black', background: 'rgb(219, 49, 49)', width: '10vw'}}
                    type="button"
                    onClick={() => removeFromCart(sorderItem)}
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
}