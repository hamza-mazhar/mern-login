import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, message } from 'antd';
import axios from 'axios';
class UpdateProfile extends React.Component {
  state = {
    name: '',
    id: '',
  };
  /* eslint-disable */
  componentDidMount() {
    axios({
      method: 'GET',
      url: 'api/user_profile',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: localStorage.getItem('token'),
      },
    }) /* eslint prefer-arrow-callback: "error" */
      .then(res => {
        this.setState({
          name: res.data.data[0].name,
          id: res.data.data[0]._id,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch('api/user_profile_update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('token'),
          },
          body: JSON.stringify({
            name: values.username,
            id: this.state.id,
          }),
        })
          .then(() => {
            message.success('Successful Update!');
          })
          .catch(error => {
            console.log(error);
            message.error(`Invalid Email or Password! ${error}`);
          });
        // .catch(err => message.error(`Invalid Email or Password! ${err}`));
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="Name">
          {getFieldDecorator('username', {
            initialValue: this.state.name,
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

UpdateProfile.propTypes = {
  validateFields: PropTypes.any,
  form: PropTypes.object,
};

const WrappedNormalUpdateForm = Form.create({ name: 'normal_login' })(
  UpdateProfile,
);

export default WrappedNormalUpdateForm;
