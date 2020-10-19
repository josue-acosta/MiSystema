import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';


// Styles
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        minWidth: 275
    }
});

class GrossSales extends Component {
    state = {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [],
        options: {
            title: {
                display: true,
                text: 'Sales per Weekday',
                fontSize: 20
            },
            legend: {
                display: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value) {
                            return '$' + value;
                        },
                        maxTicksLimit: 6
                    }
                }]
            }
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        await fetch('/weekday-sales')
            .then(response => response.json())
            .then(recievedData => {
                return (this.setState({
                    datasets: recievedData
                }))
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.root}>
                <CardContent>
                    <Line
                        data={this.state}
                        options={this.state.options}
                    />
                </CardContent>

                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles, { withTheme: true })(GrossSales);