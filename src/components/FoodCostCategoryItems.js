import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'


// Styles
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    link: {
        textDecoration: 'none',
    }
});


class FoodCostCategoryItems extends Component {
    state = {}

    render() {
        const { classes } = this.props;

        return (
            <Grid container spacing={3}>
                {this.props.categoryDataSet?.map(item => {
                    return (
                        <Grid item xs={4} key={"grid-" + item.id} component={NavLink} to={`/food-cost/${item.url}`} className={classes.link}>
                            <Card key={"card-" + item.id}>
                                <CardContent key={item.id}>
                                    {item.menu_item}
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                }
                )}
            </Grid>
        );
    }
}

export default withStyles(styles, { withTheme: true })(FoodCostCategoryItems);