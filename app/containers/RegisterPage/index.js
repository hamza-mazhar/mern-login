import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import { Form, Icon, Input, Button, message } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import {
  registerUserPending,
  registerUserSuccess,
  registerUser,
} from './actions';

class NormalRegisterForm extends React.Component {
  state = {
    redirectUrl: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onUserRegisterPending, register, onUserRegister } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        onUserRegisterPending();
        onUserRegister(values);
        if (register.error) {
          message.error(register.msg);
        } else {
          message.success('Register Successfully');
          message.success(register.msg);

          this.setState({ redirectUrl: true });
        }
        // axios({
        //   method: 'post',
        //   url: 'api/signup',
        //   data: {
        //     name: values.username,
        //     email: values.email,
        //     password: values.password,
        //   },
        // })
        //   .then((req, res) => {
        //     console.log(res);
        //     this.setState({ login: true });
        //     localStorage.setItem('token', 'Bearer ' + req.data.token);
        //     localStorage.setItem('login', this.state.login);
        //     message.success('Successful Login!');
        //     window.location.replace('/profile_update');
        //   })
        //   .catch(err => {
        //     this.setState({ login: false });
        //     localStorage.setItem('login', this.state.login);
        //     message.error('Invalid Email or Password!');
        //   });
      }
    });
  };

  render() {
    console.log('here the props in regis', this.props);
    const { getFieldDecorator } = this.props.form;
    if (this.state.redirectUrl) return <Redirect to="/login" />;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="Name">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Password">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign Up
          </Button>
          -Or-<Link to="/login">Back To Login!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalRegisterForm = Form.create({ name: 'normal_register' })(
  NormalRegisterForm,
);

NormalRegisterForm.propTypes = {
  validateFields: PropTypes.any,
  onUserRegister: PropTypes.object,
  onUserRegisterPending: PropTypes.object,
  register: PropTypes.object,
  form: PropTypes.object,
};

const mapStateToProps = state => ({
  register: state.register,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onUserRegister: registerUser,
      onUserRegisterPending: registerUserPending,
      onRegisterSuccess: registerUserSuccess,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WrappedNormalRegisterForm);
