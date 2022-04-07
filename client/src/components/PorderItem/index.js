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
                align="left"
            // sx={{
            //     width: '20vw',
            //     background: 'rgba(255, 255, 255, 0.6)',
            //     borderRadius: '.27em'
            // }}
            >
                {porderItem.name}
            </TableCell>
            <TableCell
                align="right"
            // sx={{
            //     width: '10vw',
            //     background: 'rgba(255, 255, 255, 0.6)',
            //     borderRadius: '.27em'
            // }}
            >{porderItem.quantity}</TableCell>
            <TableCell
                align="right"
            // sx={{
            //     width: '10vw',
            //     background: 'rgba(255, 255, 255, 0.6)',
            //     borderRadius: '.27em'
            // }}
            >${porderItem.unitPrice}</TableCell>
            <TableCell
                align="right"
            // sx={{
            //     width: '10vw',
            //     background: 'rgba(255, 255, 255, 0.6)',
            //     borderRadius: '.27em'
            // }}
            >${porderItem.productTotal}</TableCell>
            <TableCell align="right">
                <Button
                    sx={{ color: 'black', background: 'rgb(219, 49, 49)', width: '12vw'}}
                    type="button"
                    onClick={() => removeFromCart(porderItem)}
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
}