import { Form, Input, Button, Radio } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useRef } from "react";
import useRegister from "../hooks/useRegister.js";

const Register = () => {
  const formRef = useRef(null);
  const { register, loading } = useRegister();

  const onFinish = async (values) => {
    await register(values);
  };

  const validateUsernameAndPassword = (_, value) => {
    if (!formRef.current) {
      return Promise.resolve();
    }
    const username = formRef.current.getFieldValue("username");
    const password = formRef.current.getFieldValue("password");

    if (value && username === password) {
      return Promise.reject("Kullanıcı adı ile şifre aynı olamaz");
    }
    return Promise.resolve();
  };

  return (
    <div className="max-w-xl w-full rounded-lg p-8 space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabol">Kayıt ol</h2>
      </div>
      <Form
        noValidate
        name="register"
        className="mt-8 space-y-6"
        onFinish={onFinish}
        scrollToFirstError
        ref={formRef}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Kullanıcı adı zorunlu" },
            { whitespace: true, message: "Kullanıcı adı boş olamaz" },
            { min: 3, message: "Kullanıcı adı en az 3 karakter olmalıdır" },
            { max: 16, message: "Kullanıcı adı en fazla 16 karakter olabilir" },
            {
              pattern: /^[a-zA-Z0-9_]+(?: [a-zA-Z0-9_ğüşıöçĞÜŞİÖÇ ]+)*$/,
              message:
                "Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir",
            },
            {
              pattern: /^[^\s].*[^\s]$/,
              message: "Kullanıcı adı başlangıçta veya sonunda boşluk içeremez",
            },
            { validator: validateUsernameAndPassword },
          ]}
          validateFirst
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Kullanıcı adı"
            className="bg-transparent text-white hover:bg-transparent focus:bg-transparent"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "E-posta zorunlu" },
            { type: "email", message: "Geçerli bir e-posta girin" },
          ]}
          validateFirst
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
          rules={[
            { required: true, message: "Şifre zorunlu" },
            {
              validator: validateUsernameAndPassword,
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Şifre"
            className="bg-transparent text-white hover:bg-transparent focus:bg-transparent"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Şifre doğrulama zorunlu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Şifreler eşleşmiyor"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Şifreyi Doğrula"
            className="bg-transparent text-white hover:bg-transparent focus:bg-transparent"
          />
        </Form.Item>
        <Form.Item
          name="gender"
          rules={[{ required: true, message: "Cinsiyet zorunlu" }]}
          label={<span style={{ color: "white" }}>Cinsiyet</span>}
          wrapperCol={{ span: 200, offset: 100 }}
        >
          <Radio.Group
            name="gender"
            style={{ color: "white" }} // Yazı rengini beyaz yapar
            className="custom-radio" // Özel bir CSS class'ı burada tanımlıyoruz
          >
            <Radio
              value="male"
              style={{
                color: "white",
                backgroundColor: "transparent",
                borderColor: "white",
              }} // Tuşların stilini ayarlar
            >
              Erkek
            </Radio>
            <Radio
              value="female"
              style={{
                color: "white",
                backgroundColor: "transparent",
                borderColor: "white",
              }} // Tuşların stilini ayarlar
            >
              Kadın
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            loading={loading}
            htmlType="submit"
            className="w-full"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <div className="text-sm text-center">
        Zaten hesabın var mı ?{" "}
        <Link to="/login" className="font-bold">
          Giriş yap
        </Link>
      </div>
    </div>
  );
};

export default Register;
