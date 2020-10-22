import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import { NavLink } from 'react-router-dom'

// Components
import ViewCakeOrder from './ViewCakeOrder'


// Styles
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PrintIcon from '@material-ui/icons/Print';


const styles = theme => ({
    button: {
        marginBottom: "1rem"
    },
    buttonActionArea: {
        flexGrow: 1
    },
    deleteButton: {
        color: "#d32f2f"
    }
});


class PrintCakeOrder extends Component {
    state = {
        cakeOrder: []
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        await fetch(`/orders/view/${this.props.match.params.orderId}`)
            .then(response => response.json())
            .then(recievedData => {
                return (this.setState({
                    cakeOrder: recievedData
                }))
            })
    }

    handleDeleteOrder = async () => {
        await fetch(`/orders/delete/${this.props.match.params.orderId}`)
            .then(response => response.json())
            .then(recievedData => {
                console.log(recievedData)
            })
    }

    render() {
        const { classes } = this.props;
        const { cakeOrder } = this.state

        return (
            <>
                <ReactToPrint
                    trigger={() => {
                        return (
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<PrintIcon />} >
                                Print
                            </Button>
                        )
                    }}
                    content={() => this.componentRef}
                />

                <Card>
                    <CardContent>
                        <ViewCakeOrder ref={el => (this.componentRef = el)} cakeOrder={cakeOrder} />
                    </CardContent>

                    <CardActions>
                        <Button
                            component={NavLink}
                            to={`/order/edit/${this.props.match.params.orderId}`}
                            startIcon={<EditIcon />} >
                            Edit
                        </Button>
                        <Button
                            className={classes.deleteButton}
                            startIcon={<DeleteIcon />}
                            onClick={() => { this.handleDeleteOrder() }} >
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PrintCakeOrder);