import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from 'yup';


// Style
import { withStyles } from "@material-ui/core/styles";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    InputAdornment,
    FormControlLabel,
    Grid,
    MenuItem,
    TextField,
    Typography
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const styles = theme => ({
    card: {
        maxWidth: "75%",
        margin: "0 auto",
    },
    inputFields: {
        width: "100%"
    },
    errorMessage: {
        color: "red"
    }
});

export function MyCheckbox(props) {
    const [field] = useField({
        name: props.name,
        type: 'checkbox',
        value: props.value
    });
    return (
        <FormControlLabel
            control={<Checkbox {...props} {...field} />}
            label={props.label}
        />
    );
}


class NewCakeOrder extends Component {
    handleSubmit = async (values) => {
        await fetch('/add-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
    }

    initialValues = {
        // contact information
        name: "",
        phone_number: "",

        // # cake info
        cake_size: "",
        price: "",
        flavor_1: "",
        flavor_2: "",
        filling: "",

        // # delivery info
        date_time: "",

        // # decoration info
        decoration: "",
        print_out: false,
        celebrated_name: "",
        celebrated_age: "",
        celebrated_text: ""
    }

    OrderSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        phone_number: Yup.string()
            .length(10, 'Needs to be 10 digits long')
            .required('Required'),

        // # cake info
        cake_size: Yup.string()
            .required('Required'),
        price: Yup.number()
            .positive()
            .integer()
            .required('Required'),
        flavor_1: Yup.string()
            .required('Required'),
        flavor_2: Yup.string()
            .required('Required'),
        filling: Yup.string()
            .required('Required'),

        // # delivery info
        date_time: Yup.date()
            .required('Required'),

        // # decoration info
        decoration: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        print_out: Yup.boolean()
            .required('Required'),
        celebrated_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        celebrated_age: Yup.number()
            .positive()
            .integer()
            .required('Required'),
        celebrated_text: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    render() {
        const { classes } = this.props;

        return (
            <>
                <Typography variant="h5" color="primary" align="center" gutterBottom >New Cake Order Page</Typography>
                <Formik
                    validationSchema={this.OrderSchema}
                    initialValues={this.initialValues}
                    onSubmit={values => {
                        this.handleSubmit(values)
                    }}
                >
                    {({ values }) => (
                        <Form>
                            <Card className={classes.card} >
                                <CardContent>

                                    <Grid container spacing={3} >
                                        <Grid item xs={6}>
                                            <Field
                                                name="name"
                                                as={TextField}
                                                label="Nombre"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PermIdentityIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                className={classes.inputFields} />
                                            <ErrorMessage
                                                name="name"
                                                render={msg =>
                                                    <div className={classes.errorMessage}>{msg}</div>
                                                }
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Field
                                                name="phone_number"
                                                as={TextField}
                                                label="Telefono"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PhoneIcon />
                                                        </InputAdornment>
                                                    )
                                                }}
                                                className={classes.inputFields} />
                                            <ErrorMessage
                                                name="phone_number"
                                                render={msg =>
                                                    <div className={classes.errorMessage}>{msg}</div>
                                                }
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Field
                                                name="date_time"
                                                as={TextField}
                                                type="datetime-local"
                                                label="Fecha"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                className={classes.inputFields} />
                                            <ErrorMessage
                                                name="date_time"
                                                render={msg =>
                                                    <div className={classes.errorMessage}>{msg}</div>
                                                }
                                            />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Field name="cake_size" as={TextField} select label="Tama&ntilde;io" className={classes.inputFields} >
                                                <MenuItem value="8">8"</MenuItem>
                                                <MenuItem value="10">10"</MenuItem>
                                                <MenuItem value="12">12"</MenuItem>
                                                <MenuItem value="Half Sheet">Half Sheet</MenuItem>
                                                <MenuItem value="Full Sheet">Full Sheet</MenuItem>
                                            </Field>
                                            <ErrorMessage
                                                name="cake_size"
                                                render={msg =>
                                                    <div className={classes.errorMessage}>{msg}</div>
                                                }
                                            />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Field name="flavor_1" as={TextField} select label="Sabor #1" className={classes.inputFields} >
                                                <MenuItem value="Vanilla">Vanilla</MenuItem>
                                                <MenuItem value="Chocolate">Chocolate</MenuItem>
                                                <MenuItem value="Napolitano">Napolitano</MenuItem>
                                            </Field>
                                            <ErrorMessage
                                                name="flavor_1"
                                                render={msg =>
                                                    <div className={classes.errorMessage}>{msg}</div>
                                                }
                                            />

                                            <Field name="flavor_2" as={TextField} select label="Sabor #2" className={classes.inputFields} >
                                                <MenuItem value="Vanilla">Vanilla</MenuItem>
                                                <MenuItem value="Chocolate">Chocolate</MenuItem>
                                                <MenuItem value="Napolitano">Napolitano</MenuItem>
                                            </Field>
                                            <ErrorMessage
                                                name="flavor_2"
                                                render={msg =>
                                                    <div className={classes.errorMessage}>{msg}</div>
                                                }
                                            />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Field name="filling" as={TextField} select label="Relleno" className={classes.inputFields} >
                                                <MenuItem value="Vanilla">Vanilla</MenuItem>
                                                <MenuItem value="Chocolate">Chocolate</MenuItem>
                                            </Field>
                                            <ErrorMessage
                                                name="filling"
                                                render={msg =>
                                                    <div className={classes.errorMessage}>{msg}</div>
                                                }
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Field name="decoration" as={TextField} multiline rows={4} variant="outlined" label="Decoracion" className={classes.inputFields} />
                                            <ErrorMessage
                                                name="decoration"
                                                render={msg =>
                                                    <div className={classes.errorMessage}>{msg}</div>
                                                }
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <MyCheckbox name="print_out" label="Estampado" />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Field name="celebrated_name" as={TextField} label="Nombre de Festejado" className={classes.inputFields} />
                                            <ErrorMessage
                                                name="celebrated_name"
                                                render={msg =>
                                                    <div className={classes.errorMessage}>{msg}</div>
                                                }
                                            />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Field name="celebrated_age" type="number" as={TextField} label="Edad de Festejado" className={classes.inputFields} />
                                            <ErrorMessage
                                                name="celebrated_age"
                                                render={msg =>
                                                    <div className={classes.errorMessage}>{msg}</div>
                                                }
                                            />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Field name="celebrated_text" as={TextField} multiline label="Mensaje del Festejado" className={classes.inputFields} />
                                            <ErrorMessage
                                                name="celebrated_text"
                                                render={msg =>
                                                    <div className={classes.errorMessage}>{msg}</div>
                                                }
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Field
                                                name="price"
                                                type="number"
                                                as={TextField}
                                                label="Precio"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            $
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                className={classes.inputFields} />
                                            <ErrorMessage
                                                name="price"
                                                render={msg =>
                                                    <div className={classes.errorMessage}>{msg}</div>
                                                }
                                            />
                                        </Grid>

                                    </Grid>

                                </CardContent>

                                <CardActions>
                                    <Button color="primary" variant="contained" type="submit">
                                        Submit
                                    </Button>
                                </CardActions>
                            </Card>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewCakeOrder);