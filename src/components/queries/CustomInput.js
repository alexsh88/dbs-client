import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';

export default class FieldFormControl extends Component {
    render() {
        const { placeholder, type, input, meta} = this.props;
        return (
            <FormGroup controlId={input.name} validationState={meta.error && meta.dirty ? 'error' : ''}>
                <ControlLabel>{this.props.children}</ControlLabel>
                <FormControl type={type}
                             placeholder={placeholder}
                             value={input.value}
                             onChange={input.onChange}
                             id={input.name ? input.name : {}} />
                <HelpBlock> {meta.touched &&
                ((meta.error && <span>{meta.error}</span>) ||
                    (meta.warning && <span>{meta.warning}</span>))}</HelpBlock>
                <FormControl.Feedback/>

            </FormGroup>
        );
    }
}

