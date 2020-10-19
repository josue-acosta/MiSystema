import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const CakeOrder = ({ date, payee_name, category_name, amount }) => {
    return (
        <TableRow>
            <TableCell>{date}</TableCell>
            <TableCell>{payee_name}</TableCell>
            <TableCell>{category_name}</TableCell>
            <TableCell>{amount}</TableCell>
        </TableRow>
    );
}

export default CakeOrder;