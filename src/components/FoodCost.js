import React, { Component } from 'react';

// Components
import TabPanel from './TabPanel'
import FoodCostCategoryItems from './FoodCostCategoryItems'

// Styles
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#e8eaf6',
    },
});

class FoodCost extends Component {
    state = {
        value: 0,
        categories: {}
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        await fetch('/food-cost')
            .then(response => response.json())
            .then(recievedData => {
                return (
                    this.setState(prevState => ({
                        ...prevState,
                        categories: recievedData
                    }))
                )
            })
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue })
    };

    render() {
        const { classes } = this.props;
        const { value, categories } = this.state

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange} aria-label="simple tabs example">
                        <Tab label="Cakes" {...a11yProps(0)} />
                        <Tab label="Pastries" {...a11yProps(1)} />
                        <Tab label="Bread" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <FoodCostCategoryItems categoryDataSet={categories.cakes} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <FoodCostCategoryItems categoryDataSet={categories.pastries} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <FoodCostCategoryItems categoryDataSet={categories.bread} />
                </TabPanel>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(FoodCost);