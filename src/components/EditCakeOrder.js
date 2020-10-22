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
    Typography,
    Select
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Skeleton from '@material-ui/lab/Skeleton';

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


class EditCakeOrder extends Component {
    // handleSubmit = async (values) => {
    //     await fetch(`/order/edit/${this.props.match.params.orderId}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(values)
    //     })
    // }

    state = {
        cakeOrder: [
            { label: 'First Name', type: 'input', name: 'firstName', value: 'Wednesday' },
            { label: 'Last Name', type: 'input', name: 'lastName', value: 'Lopez' },
            { label: 'Address', type: 'input', name: 'address', value: '10 FSS Street' },
            { label: 'City', type: 'input', name: 'city', value: 'London' },
            { label: 'Occupation', type: 'select', data: ['Teacher', 'Software Engineer', 'Doctor', 'Lawyer'], name: 'occupation', value: 'Teacher' }
        ]
    }

    componentDidMount() {
        // this.getData();
    }

    getData = async () => {
        await fetch(`/order/edit/${this.props.match.params.orderId}`)
            .then(response => response.json())
            .then(recievedData => {
                return (this.setState({
                    cakeOrder: recievedData
                }))
            })
            .catch(error => {
                console.log('Error in fetching and parsing data', error)
            });
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

    validation = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        address: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        city: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        occupation: Yup.string()
            .test('county', 'cannot be empty', value => value !== 'Please Select')
            .required('required'),
    });


    getInitialValues(inputs) {
        //declare an empty initialValues object
        const initialValues = {};
        //loop loop over fields array
        //if prop does not exit in the initialValues object,
        // pluck off the name and value props and add it to the initialValues object;
        inputs.forEach(field => {
            if (!initialValues[field.name]) {
                initialValues[field.name] = field.value;
            }
        });

        //return initialValues object
        return initialValues;
    }

    renderFields(inputs) {
        return inputs.map(input => {
            if (input.type === 'select') {
                return this.renderSelect(input);
            }

            return (
                <div key={input.name}>
                    <div>
                        <Field
                            name={input.name}
                            as={TextField}
                            label={input.label}
                            fullWidth
                        />
                        <ErrorMessage
                            name={input.name}
                            render={msg =>
                                <div>{msg}</div>
                            }
                        />
                    </div>
                </div>
            );
        })
    }

    renderSelect(input) {
        return (
            <div key={input.name}>
                <Field name={input.name} >
                    {({ field }) => {
                        const selectOptions = input.data.map(index => <MenuItem key={index} value={index} >{index}</MenuItem>);
                        return (
                            <Select
                                fullWidth
                                value={field.value}
                                {...field} >
                                {selectOptions}
                            </Select>
                        );
                    }}
                </Field>
                <ErrorMessage
                    name={input.name}
                    render={msg =>
                        <div>{msg}</div>
                    }
                />
            </div>
        );
    }

    handleSubmit = (values) => {
        console.log(values)
    }

    render() {
        const initialValues = this.getInitialValues(this.state.cakeOrder);

        return (
            <>
                <Formik
                    validationSchema={this.validation}
                    initialValues={initialValues}
                    onSubmit={values => {
                        this.handleSubmit(values)
                    }} >

                    {({ values }) => (
                        <Form>
                            {this.renderFields(this.state.cakeOrder)}

                            <Button color="primary" variant="contained" type="submit" >
                                Submit
                            </Button>
                            <pre>{JSON.stringify(values, null, 4)}</pre>
                        </Form>
                    )}

                </Formik>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(EditCakeOrder);