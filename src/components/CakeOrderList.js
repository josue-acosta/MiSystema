import React, { Component } from 'react';
import { iso8601WeekNumber, weekNumberFormat, weekNumberMonth } from "../helperFunction/weekNumberHelpers";

// Components
import CakeOrder from './CakeOrder'
import CakeOrderPagination from './CakeOrderPagination'

// Styles
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class CakeOrderList extends Component {
    state = {
        cakeOrders: [],
        viewWeekNumber: null,
        weekRange: "",
        month: "",
        weekOrders: []
    }

    componentDidMount() {
        this.getData();
    }

    // componentDidUpdate() {
    //     this.getThisWeekNumberFormat()
    // }

    getData = async () => {
        await fetch('/orders')
            .then(response => response.json())
            .then(recievedData => {
                return (this.setState({
                    cakeOrders: recievedData
                }))
            })

        this.getThisWeekOrders();
        this.getWeeklyRange(this.state.viewWeekNumber);
        this.getWeeklyMonth(this.state.viewWeekNumber);
    }

    getThisWeekNumber = () => {
        const dateTime = new Date();
        const thisWeekNumber = iso8601WeekNumber(dateTime);

        this.setState({ viewWeekNumber: thisWeekNumber })

        return thisWeekNumber;
    }

    getWeeklyRange = (viewWeekNumber) => {
        const weekRange = weekNumberFormat(viewWeekNumber)
        this.setState({ weekRange: weekRange })
    }

    getWeeklyMonth = (viewWeekNumber) => {
        const weekRangeMonth = weekNumberMonth(viewWeekNumber)
        this.setState({ month: weekRangeMonth })
        // weekNumberMonth
    }

    getThisWeekOrders = () => {
        const thisWeekNumber = this.getThisWeekNumber()
        const weeklyOrders = this.getWeeklyOrders(thisWeekNumber)

        this.setState({
            weekOrders: weeklyOrders
        })
    }

    getWeeklyOrders = (weekNumber) => {
        const weeklyOrders = this.state.cakeOrders.filter(obj => {
            return obj.iso_week === weekNumber.toString()
        })

        return weeklyOrders
    }

    handleChangeWeek = (delta) => {
        const thisWeekNumber = this.state.viewWeekNumber
        const newWeekNumber = Number(thisWeekNumber) + delta
        const newWeeklyOrders = this.getWeeklyOrders(newWeekNumber)

        this.getWeeklyRange(newWeekNumber)
        this.getWeeklyMonth(newWeekNumber)
        this.setState({
            weekOrders: newWeeklyOrders,
            viewWeekNumber: newWeekNumber
        })
    }

    handleResetWeek = () => {
        const newWeekNumber = this.getThisWeekNumber()
        const newWeeklyOrders = this.getWeeklyOrders(newWeekNumber)

        this.getWeeklyRange(newWeekNumber)
        this.getWeeklyMonth(newWeekNumber)
        this.setState({
            weekOrders: newWeeklyOrders,
            viewWeekNumber: newWeekNumber
        })
    }

    render() {
        return (
            <>
                <CakeOrderPagination
                    weekRange={this.state.weekRange}
                    month={this.state.month}
                    changeWeek={this.handleChangeWeek}
                    resetWeek={this.handleResetWeek}
                />
                <TableContainer component={Paper}>
                    <Table aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order No.</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Flavor 1</TableCell>
                                <TableCell>Flavor 2</TableCell>
                                <TableCell>Size</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state?.weekOrders.map(order =>
                                <CakeOrder {...order} key={order.order_number} />
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default CakeOrderList;