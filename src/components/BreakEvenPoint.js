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

class BreakEvenPoint extends Component {
    state = {
        sales: [],
        labels: ['Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Gross Sales',
                lineTension: .1,
                borderColor: 'rgba(86, 207, 225)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                data: [37, 176, 315, 454, 940, 1718, 2690]
            },
            {
                label: 'Expenses',
                lineTension: .1,
                borderColor: 'rgba(255, 18, 10)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                data: [67, 139, 139, 139, 486, 778, 972]
            }
        ],
        options: {
            title: {
                display: true,
                text: 'Break Even Point',
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

    // componentDidMount() {
    //     this.getData();
    // }

    // getData = async () => {
    //     await fetch('/sales')
    //         .then(response => response.json())
    //         .then(recievedData => {
    //             return (this.setState({
    //                 sales: recievedData
    //             }))
    //         });
    // }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.root}>
                <CardContent>
                    <div>
                        <Line
                            data={this.state}
                            options={this.state.options}
                        />
                    </div>
                </CardContent>

                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles, { withTheme: true })(BreakEvenPoint);