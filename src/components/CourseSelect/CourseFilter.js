
//React
import React, { Component } from 'react';

//External Components
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class CourseFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chosen:"",
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (val) {
        this.setState({
            chosen:val,
        });
        console.log(val);
        this.props.onChange([val,this.props.attribute]);
    }

  render() {
    const {chosen} = this.state;
    const {options,attribute} = this.props;
    return (
    <div>
    <Select
            placeholder={attribute}
            value={chosen}
            onChange={this.handleChange}
            options={options}
    />
    </div>
  )}
}

export default CourseFilter;

