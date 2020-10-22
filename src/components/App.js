import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom'

// Components
import Dashboard from './Dashboard'
import CakeList from './CakeOrderList'
import NewCakeOrder from './NewCakeOrder'
import PrintCakeOrder from './PrintCakeOrder'
import GrossSales from './GrossSales'
import FoodCost from './FoodCost'
import RevenueStreams from './RevenueStreams'
import BreakEvenPointPage from './BreakEvenPointPage'
import CategoryItemsList from './CategoryItemsList'
import FoodCostItem from './FoodCostItem'


// Styles
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


// Icons
import DashboardIcon from '@material-ui/icons/Dashboard'; // view dashboard
import AddIcon from '@material-ui/icons/Add'; // new order
import ViewListIcon from '@material-ui/icons/ViewList'; // view sale
import ReceiptIcon from '@material-ui/icons/Receipt'; // gross sales
// import AccountBalanceIcon from '@material-ui/icons/AccountBalance'; // transactions
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'; // food cost
import DonutLargeIcon from '@material-ui/icons/DonutLarge'; // revenue streams
import MultilineChartIcon from '@material-ui/icons/MultilineChart'; // break even point
import DescriptionIcon from '@material-ui/icons/Description'; // balance sheet
import ExposureIcon from '@material-ui/icons/Exposure'; // profit and loss
import TrendingUpIcon from '@material-ui/icons/TrendingUp'; // cash flow


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    rotateIcon: {
        transform: 'rotate(180deg)'
    }
}));

export default function PermanentDrawerLeft() {
    const classes = useStyles();

    return (
        <BrowserRouter>
            <div className={classes.root}>
                <CssBaseline />

                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Mi Systema
                        </Typography>
                        <Button color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>

                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left" >
                    <div className={classes.toolbar} />
                    <Divider />
                    <List>
                        <ListItem button component={NavLink} to="/" >
                            <ListItemIcon><DashboardIcon /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button component={NavLink} to="/new-order" >
                            <ListItemIcon><AddIcon /></ListItemIcon>
                            <ListItemText primary="New Order" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/view-orders" >
                            <ListItemIcon><ViewListIcon /></ListItemIcon>
                            <ListItemText primary="View Orders" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button component={NavLink} to="/gross-sales" >
                            <ListItemIcon><ReceiptIcon /></ListItemIcon>
                            <ListItemText primary="Gross Sales" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/food-cost" >
                            <ListItemIcon><AddShoppingCartIcon /></ListItemIcon>
                            <ListItemText primary="Food Cost" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button component={NavLink} to="/revenue-streams" >
                            <ListItemIcon><DonutLargeIcon /></ListItemIcon>
                            <ListItemText primary="Revenue Streams" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/break-even-point" >
                            <ListItemIcon><MultilineChartIcon /></ListItemIcon>
                            <ListItemText primary="Break Even Point" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button component={NavLink} to="/balance-sheet" >
                            <ListItemIcon><DescriptionIcon /></ListItemIcon>
                            <ListItemText primary="Balance Sheet" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/profit-and-loss" >
                            <ListItemIcon><ExposureIcon className={classes.rotateIcon} /></ListItemIcon>
                            <ListItemText primary="Profit &amp; Loss" />
                        </ListItem>
                        <ListItem button component={NavLink} to="/cash-flow" >
                            <ListItemIcon><TrendingUpIcon /></ListItemIcon>
                            <ListItemText primary="Cash Flow" />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/new-order" component={NewCakeOrder} />
                    <Route path="/view-orders" component={CakeList} />

                    <Route path="/gross-sales" component={GrossSales} />
                    <Route exact path="/food-cost" component={FoodCost} />

                    <Route path="/revenue-streams" component={RevenueStreams} />
                    <Route path="/break-even-point" component={BreakEvenPointPage} />

                    <Route path="/balance-sheet" component={Dashboard} />
                    <Route path="/profit-and-loss" component={Dashboard} />
                    <Route path="/cash-flow" component={Dashboard} />

                    <Route exact path="/food-cost/:categoryItem" render={(props) => <CategoryItemsList {...props} />} />
                    <Route path="/food-cost/:categoryItem/:foodCostItem" render={(props) => <FoodCostItem {...props} />} />

                    <Route exact path="/order/:orderId/" render={(props) => <PrintCakeOrder {...props} />} />
                </main>
            </div>
        </BrowserRouter>
    );
}
