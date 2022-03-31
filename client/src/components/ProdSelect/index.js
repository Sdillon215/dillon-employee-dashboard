import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useStoreContext } from '../../utils/GlobalState';

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


function getStyles(product, productId, theme) {
    return {
        fontWeight:
            productId.indexOf(product) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function BasicSelect() {
    const [state] = useStoreContext();
    const { products } = state;
    const theme = useTheme();
    const [productId, setproductId] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setproductId(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <Select
                    id="demo-multiple-name"
                    name="product"
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    input={<OutlinedInput />}
                >
                    {products.map((product) => (
                        <MenuItem
                            key={product._id}
                            value={product._id}
                            style={getStyles(product, productId, theme)}
                        >
                            {product.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
