import React, { Component } from 'react';

// Styles
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField'
import PhoneIcon from '@material-ui/icons/Phone';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import TodayIcon from '@material-ui/icons/Today';

const styles = theme => ({
    paper: {
        padding: "1rem"
    }
});

class ViewCakeOrder extends Component {
    render() {
        const { classes } = this.props;

        const {
            order_number,
            name,
            phone_number,
            date_time,
            cake_size,
            flavor_1,
            flavor_2,
            filling,
            decoration,
            print_out,
            celebrated_name,
            celebrated_age,
            celebrated_text,
            price
        } = this.props.cakeOrder

        return (
            <>
                <Grid container spacing={2} className={classes.paper} >
                    <Grid item xs={6}>
                        <Typography variant="subtitle2" >Order No.</Typography>
                        <Typography variant="body1" >{order_number}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            name="name"
                            label="Nombre"
                            value={name}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PermIdentityIcon />
                                    </InputAdornment>
                                )
                            }}
                            InputLabelProps={{
                                readOnly: true,
                                shrink: true
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            name="date_time"
                            label="Fecha"
                            value={date_time}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TodayIcon />
                                    </InputAdornment>
                                )
                            }}
                            InputLabelProps={{
                                readOnly: true,
                                shrink: true
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            name="phone_number"
                            label="Telefono"
                            value={phone_number}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon />
                                    </InputAdornment>
                                )
                            }}
                            InputLabelProps={{
                                readOnly: true,
                                shrink: true
                            }}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            name="cake_size"
                            label="Tama&ntilde;io"
                            value={cake_size}
                            fullWidth
                            InputLabelProps={{
                                readOnly: true,
                                shrink: true
                            }} >
                        </TextField>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            name="flavor_1"
                            label="Sabor #1"
                            value={flavor_1}
                            fullWidth
                            InputLabelProps={{
                                readOnly: true,
                                shrink: true
                            }} >
                        </TextField>

                        <TextField
                            name="flavor_2"
                            label="Sabor #2"
                            value={flavor_2}
                            fullWidth
                            InputLabelProps={{
                                readOnly: true,
                                shrink: true
                            }} >
                        </TextField>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            name="filling"
                            label="Relleno"
                            value={filling}
                            fullWidth
                            InputLabelProps={{
                                readOnly: true,
                                shrink: true
                            }} >
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            name="decoration"
                            multiline
                            rows={3}
                            variant="outlined"
                            label="Decoracion"
                            value={decoration}
                            fullWidth
                            InputLabelProps={{
                                readOnly: true,
                                shrink: true
                            }} />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            name="celebrated_name"
                            label="Nombre de Festejado"
                            value={celebrated_name}
                            fullWidth
                            InputLabelProps={{
                                readOnly: true,
                                shrink: true
                            }} />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            name="celebrated_age"
                            type="number"
                            label="Edad de Festejado"
                            value={celebrated_age}
                            fullWidth
                            InputLabelProps={{
                                readOnly: true,
                                shrink: true
                            }} />
                    </Grid>

                    <Grid item xs={4}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={print_out ? true : false}
                                    name="print_out"
                                    color="secondary"
                                />
                            }
                            label="Estampado"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            name="celebrated_text"
                            multiline
                            label="Mensaje del Festejado"
                            value={celebrated_text}
                            fullWidth
                            InputLabelProps={{
                                readOnly: true,
                                shrink: true
                            }} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            name="price"
                            type="number"
                            label="Precio"
                            value={price}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                )
                            }}
                            InputLabelProps={{
                                readOnly: true,
                                shrink: true
                            }}
                        />
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ViewCakeOrder);