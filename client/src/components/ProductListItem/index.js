import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export default function ProductListItem({ product }) {

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