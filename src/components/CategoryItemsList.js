import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
    title: {
        marginBottom: "1rem",
    },
    table: {
        textAlign: "center"
    },
    link: {
        textDecoration: 'none',
    }
});


class CategoryItemsList extends Component {
    state = {
        foodItem: "",
        itemData: []
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        await fetch(`/food-cost/${this.props.match.params.categoryItem}`)
            .then(response => response.json())
            .then(recievedData => {
                return (this.setState({
                    foodItem: recievedData.foodItem,
                    itemData: recievedData.itemData
                }))
            })
    }

    render() {
        const { foodItem } = this.state;
        const { classes, match } = this.props;

        return (
            <>
                <Typography variant="h4" className={classes.title}>
                    {foodItem}
                </Typography>

                <TableContainer component={Paper}>
                    <Table aria-label="a dense table" className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Portion Size</TableCell>
                                <TableCell>Cost per Portion</TableCell>
                                <TableCell>Sales Price</TableCell>
                                <TableCell>Food Cost Percentage</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.itemData.map(item => {
                                return (
                                    <TableRow key={item.id} component={NavLink} to={`/food-cost/${match.params.categoryItem}/${item.id}`} className={classes.link}>
                                        <TableCell>{item.portionSize}</TableCell>
                                        <TableCell>${item.costPerPortion}</TableCell>
                                        <TableCell>${item.salesPrice}</TableCell>
                                        <TableCell>{item.foodCostPercent}%</TableCell>
                                        <TableCell>{item.lastUpdatedOn ? item.lastUpdatedOn : item.createdOnDate}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(CategoryItemsList);