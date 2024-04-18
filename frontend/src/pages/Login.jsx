import React, { useRef } from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin.js";

const Login = () => {
  const { loading, login } = useLogin();
  const formRef = useRef(null);

  const onFinish = async (values) => {
    await login(values);
  };

  return (
    <div className="max-w-xl w-full rounded-lg p-8 space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabol">Giriş Yap</h2>
      </div>
      <Form
        noValidate
        name="login"
        className="mt-8 space-y-6"
        onFinish={onFinish}
        scrollToFirstError
        ref={formRef}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "E-posta zorunlu" },
            { type: "email", message: "Geçerli bir e-posta girin" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            type="email"
            placeholder="E-posta"
            className="bg-transparent text-white hover:bg-transparent focus:bg-transparent"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Şifre zorunlu" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Şifre"
            className="bg-transparent text-white hover:bg-transparent focus:bg-transparent"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            loading={loading}
            htmlType="submit"
            className="w-full"
          >
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
      <div className="text-sm text-center">
        Hesabınız yok mu?{" "}
        <Link to="/register" className="font-bold">
          Kayıt ol
        </Link>
      </div>
    </div>
  );
};

export default Login;
