import React from 'react';

// Components
import GrossSales from './GrossSales'
import BreakEvenPoint from './BreakEvenPoint'
import RevenueStreams from './RevenueStreams'

// Styles
import Grid from '@material-ui/core/Grid';


const Dashabord = () => {
    return (
        <>
            <Grid container justify="center" spacing={2} >
                <Grid item xs={10}>
                    <GrossSales />
                </Grid>

                <Grid item xs={6}>
                    <RevenueStreams />
                </Grid>
                <Grid item xs={6}>
                    <BreakEvenPoint />
                </Grid>
            </Grid>
        </>
    );
}

export default Dashabord;