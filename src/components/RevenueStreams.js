import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';


// Styles
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


class RevenueStreams extends Component {
    state = {
        labels: ['Cakes', 'Pastries', 'Bread'],
        datasets: [],
        options: {
            cutoutPercentage: 40,
            title: {
                display: true,
                text: 'Weekly Gross Sales',
                fontSize: 20
            }
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        await fetch('/weekly-gross-sales')
            .then(response => response.json())
            .then(recievedData => {
                return (this.setState({
                    datasets: recievedData
                }))
            });
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Doughnut data={this.state} options={this.state.options} />
                </CardContent>

                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        );
    }
}

export default RevenueStreams;