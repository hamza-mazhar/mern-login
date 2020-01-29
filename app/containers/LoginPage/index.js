import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Form, Icon, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { loginUserPending, loginUser } from './actions';

class NormalLoginForm extends React.Component {
  state = {
    redirectUrl: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onUserLogin, login, onUserPending } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onUserPending();
        onUserLogin(values);
        if (login.error) {
          message.error(login.msg);
        }
        if (login.data !== '') {
          message.success('Login Successfully');
          this.setState({ redirectUrl: true });
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.redirectUrl) return window.location.replace('/');
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
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
            Log in
          </Button>
          -Or-<Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

NormalLoginForm.propTypes = {
  validateFields: PropTypes.any,
  onUserLogin: PropTypes.object,
  onUserPending: PropTypes.object,
  login: PropTypes.object,
  form: PropTypes.object,
};

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm,
);

const mapStateToProps = state => ({
  login: state.login,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onUserLogin: loginUser,
      onUserPending: loginUserPending,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WrappedNormalLoginForm);
