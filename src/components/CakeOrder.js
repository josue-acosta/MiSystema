import React from 'react';
import { NavLink } from 'react-router-dom'

// Styles
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button'

const CakeOrder = ({ id, order_number, name, flavor_1, flavor_2, cake_size, date_time, price }) => {
    const cakeSize = ["Full Sheet", "Half Sheet"]
    return (
        <TableRow>
            <TableCell>{order_number}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{flavor_1}</TableCell>
            <TableCell>{flavor_2}</TableCell>
            <TableCell>{cake_size}{cakeSize.includes(cake_size) ? null : "\""}</TableCell>
            <TableCell>{date_time}</TableCell>
            <TableCell>${price}</TableCell>
            <TableCell>
                <Button variant="outlined" color="primary" component={NavLink} to={`/order/${id}`} >View</Button>
            </TableCell>
        </TableRow >
    );
}

export default CakeOrder;