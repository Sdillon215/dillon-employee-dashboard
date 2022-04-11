import * as React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
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


    const MenuProps = {
        PaperProps: {
            style: {
                width: '15vw',
                
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
            dispatch({
                type: UPDATE_PRODUCTS,
                products: products
            });
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
        <Box sx={{ minWidth: '20vw' }}>
            <FormControl sx={{ width: '15vw', textAlign: 'center' }}>
                <Select
                    displayEmpty
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
                    <MenuItem value={''}>Departments</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}