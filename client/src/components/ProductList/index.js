import * as React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ProductListItem from '../ProductListItem';


export default function ProductList() {
    const [state] = useStoreContext();
    const { currentDepartment, products } = state;


    return (
        <>
            {!currentDepartment ? (
                <></>
            ) : (
                <div class='blurContainer btm'>
                    <TableContainer sx={{
                        width: '100%',
                        marginTop: '10px',
                        padding: '10px'
                    }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={12} align="center"><h2>Current Inventory</h2></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Product</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell sx={{ minWidth: '69px' }} align="right">Unit Price</TableCell>
                                    <TableCell align="right">Units Available</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.length ? (
                                    <>
                                        {products.map(product => (
                                            <ProductListItem key={product._id} product={product} />
                                        ))}
                                    </>
                                ) : (
                                    <></>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer >
                </div>
            )}
        </>
    );
}