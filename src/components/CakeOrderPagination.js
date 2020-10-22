import React from 'react';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
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
    },
    pagination: {
        textAlign: "right"
    },
    titleMonth: {
        textAlign: "center"
    }
}));


const CakeOrderPagination = ({ weekRange, month, changeWeek, resetWeek }) => {
    const classes = useStyles();

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography variant="h6" >
                                {weekRange}
                            </Typography>
                        </Grid>

                        <Grid item xs={4} className={classes.titleMonth} >
                            <Typography variant="h6" >
                                {month}
                            </Typography>
                        </Grid>

                        <Grid item xs={4} className={classes.pagination} >
                            <IconButton className={classes.menuItem} aria-label="previouse week" component="span" onClick={() => { changeWeek(-1) }} >
                                <NavigateBeforeIcon />
                            </IconButton>

                            <Button className={classes.menuItem} onClick={() => { resetWeek() }}>This Week</Button>

                            <IconButton className={classes.menuItem} aria-label="next week" component="span" onClick={() => { changeWeek(1) }} >
                                <NavigateNextIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default CakeOrderPagination;