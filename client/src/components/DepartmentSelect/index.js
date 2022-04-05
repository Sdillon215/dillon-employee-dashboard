import * as React from 'react';
// import { useState, useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { OutlinedInput } from '@mui/material';
import { UPDATE_CURRENT_DEPARTMENT, UPDATE_PRODUCTS } from '../../utils/actions';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';


export default function DepartmentSelect() {
    const [state, dispatch] = useStoreContext();
    const { departments, currentDepartment } = state;
    const [departmentId, setDepartment] = React.useState([]);
    const theme = useTheme();
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;


    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    function getStyles(department, departmentId, theme) {
        return {
            fontWeight:
                departmentId.indexOf(department) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setDepartment(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        if (value) {
            const currentDep = departments.find((department) => department._id === value);
            dispatch({
                type: UPDATE_CURRENT_DEPARTMENT,
                currentDepartment: currentDep
            });
            const products = currentDep.products;
            console.log(products)
            dispatch({
                type: UPDATE_PRODUCTS,
                products: products
            })
        } else {
            dispatch({
                type: UPDATE_CURRENT_DEPARTMENT,
                currentDepartment: ''
            });
            dispatch({
                type: UPDATE_PRODUCTS,
                products: []
            })
        }
    };
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, width: 300 }}>
                <Select
                    // id="demo-multiple-name"
                    name="product"
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    value={departmentId}
                >
                    {departments.map((department) => (
                        <MenuItem
                            // onClick={() => {
                            //     handleClick(department._id)
                            // }}
                            key={department._id}
                            value={department._id}
                            style={getStyles(department, departmentId, theme)}
                        >
                            {department.name}
                        </MenuItem>
                    ))}
                    <MenuItem value={''}>All</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}