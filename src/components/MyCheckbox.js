import React from 'react';

const MyCheckbox = (props) => {
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

export default MyCheckbox;
