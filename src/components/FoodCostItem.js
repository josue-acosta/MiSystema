import React, { Component } from 'react';

// Styles
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        minWidth: 275
    },
    table: {
        marginTop: "1rem"
    }
});

class FoodCostItem extends Component {
    state = {
        itemData: {},
        ingredients: []
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        await fetch(`/food-cost/${this.props.match.params.categoryItem}/${this.props.match.params.foodCostItem}`)
            .then(response => response.json())
            .then(recievedData => {
                return (this.setState({
                    itemData: recievedData.itemData,
                    ingredients: recievedData.ingredients
                }))
            })
    }

    render() {
        const { itemData, ingredients } = this.state;
        const { classes } = this.props;

        return (
            <>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                Menu Item: {itemData.foodItem}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                Portion Size: {itemData.portionSize}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                Date: {itemData.lastUpdatedOn ? itemData.lastUpdatedOn : itemData.createdOnDate}
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                Cost per Portion: {itemData.costPerPortion}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                Sales Price: {itemData.salesPrice}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                Food Cost Percentage: {itemData.foodCostPercent}
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                Recipie Quantity: {itemData.recipeQuantity}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                Total Recipe Cost: {itemData.totalRecipeCost}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                Total Gross Sales: {itemData.totalGrosSales}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <TableContainer component={Paper} className={classes.table}>
                    <Table aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ingredient</TableCell>
                                <TableCell>Recipe Quantity</TableCell>
                                <TableCell>Unit Cost</TableCell>
                                <TableCell>Total Cost</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredients.map(ingredient => {
                                return (
                                    <TableRow key={ingredient.ingredient}>
                                        <TableCell>{ingredient.ingredient}</TableCell>
                                        <TableCell>{ingredient.recipe_quantity}</TableCell>
                                        <TableCell>{ingredient.epc_unit}</TableCell>
                                        <TableCell>{ingredient.total_cost}</TableCell>
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

export default withStyles(styles, { withTheme: true })(FoodCostItem);