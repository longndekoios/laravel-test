import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const NormalLoginForm = () => {
  const router = useRouter();
  const [errText, setErrText] = useState('');

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (res.status < 300) { 
        router.push('/admin');
      }
      else {
        setErrText(res.statusText);
      }
    } catch(e: any) {
      console.log(e);
      setErrText(e?.statusText);
    }

  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col span={4}>
        {errText && (
          <Alert message={errText} type="error" style={{marginBottom: 10}} />
        )}

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default NormalLoginForm;
