import React from 'react';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    menuItem: {
        color: 'white'
    }
}));


const CakeOrderPagination = ({ weekRange, month, changeWeek, resetWeek }) => {
    const classes = useStyles();

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} >
                        {weekRange}
                    </Typography>

                    <Typography variant="h6" className={classes.title} >
                        {month}
                    </Typography>

                    <IconButton className={classes.menuItem} aria-label="previouse week" component="span" onClick={() => { changeWeek(-1) }} >
                        <NavigateBeforeIcon />
                    </IconButton>

                    <Button className={classes.menuItem} onClick={() => { resetWeek() }}>This Week</Button>

                    <IconButton className={classes.menuItem} aria-label="next week" component="span" onClick={() => { changeWeek(1) }} >
                        <NavigateNextIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default CakeOrderPagination;