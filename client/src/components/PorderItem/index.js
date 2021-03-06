import * as React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import TableCell from '@mui/material/TableCell';
import { Button } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { REMOVE_FROM_PO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';




export default function PorderItem({ porderItem }) {
    const [state, dispatch] = useStoreContext();

    const removeFromCart = porderItem => {
        dispatch({
            type: REMOVE_FROM_PO_CART,
            _id: porderItem._id
        });
        idbPromise('poCart', 'delete', { ...porderItem });
    };

    return (
        <TableRow
            sx={{ width: '100%' }}
        >
            <TableCell
                align="left">
                {porderItem.name}
            </TableCell>
            <TableCell
                align="right">{porderItem.quantity}</TableCell>
            <TableCell
                align="right">${porderItem.unitPrice}</TableCell>
            <TableCell
                align="right">${porderItem.productTotal}</TableCell>
            <TableCell align="right">
                <Button
                    sx={{ color: 'black', background: 'rgb(219, 49, 49)', width: '10vw'}}
                    type="button"
                    onClick={() => removeFromCart(porderItem)}
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
}