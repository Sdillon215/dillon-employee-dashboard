import * as React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import TableCell from '@mui/material/TableCell';
import { Button } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { REMOVE_FROM_SO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';




export default function ProductListItem({ product }) {
    const [state, dispatch] = useStoreContext();

    

    return (
        <TableRow
            sx={{ width: '100%' }}
        >
            <TableCell
                align="left">
                {product.name}
            </TableCell>
            <TableCell
                align="right"
            >{product.description}</TableCell>
            <TableCell
                align="right"
            >${product.price}</TableCell>
            <TableCell
                align="right"
            >{product.invQuantity}</TableCell>
            <TableCell align="right">
                <img
                    src={`/images/${product.image}?w=164&h=164&fit=crop&auto=format`}
                    alt={product.name}
                    loading="lazy"
                />
            </TableCell>
        </TableRow>
    );
}