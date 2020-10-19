import React, { Component } from 'react';
import { utils } from 'ynab'


// Styles
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        minWidth: 275
    }
});


class Balance extends Component {
    state = {
        balance: null
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const token = '44909760bb229b3d78d58e45b66c6425d13d6fbec19f2f84856844eb7eb0e97d';
        const budgetId = 'd7fd915c-4b6a-4046-9cfe-dabeb7d07147'
        const accountId = '576c9b91-5c4b-4152-9245-a3eba1276a65'

        await fetch(`https://api.youneedabudget.com/v1/budgets/${budgetId}/accounts/${accountId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(recievedData => {
                return (this.setState({
                    balance: utils.convertMilliUnitsToCurrencyAmount(recievedData.data.account.balance, 2)
                }))
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        Bank Balance
                    </Typography>
                    <Typography variant="h5" component="h2">
                        ${this.state.balance}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Balance);