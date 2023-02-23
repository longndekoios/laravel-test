import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { HttpResponse } from "@/types/httpResponse";
import { DispatchLog } from "@/types/dispatchLog";
import { withSessionSsr } from "@/lib/session";
import { useRouter } from "next/router";
import { httpGet } from "@/lib/apiHelper";

const { Header, Sider, Content } = Layout;

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async ({ req, res }) => {
    try {
      if (!req.session.access_token) {
        res.writeHead(301, { Location: "/" });
        res.end();
      }

      const token = req.session.access_token;

      const response = await httpGet(`api/dispatch_logs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        props: response.data,
      };
    } catch {
      res.statusCode = 404;
      return {
        props: {},
      };
    }
  }
);

export default function Home(props: HttpResponse<DispatchLog>) {
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();

  const columns: ColumnsType<DispatchLog> = [
    {
      title: "id",
      dataIndex: "id",
      filterSearch: false,
      width: "50px",
    },
    {
      title: "payload_id",
      dataIndex: "payload_id",
      width: "120px",
    },
    {
      title: "partner_id",
      dataIndex: "partner_id",
      width: "120px",
    },
    {
      title: "sent_payload",
      dataIndex: "sent_payload",
      width: "440px",
    },
    {
      title: "sent_at",
      dataIndex: "sent_at",
      width: "150px",
      ellipsis: true,
    },
    {
      title: "response_status",
      dataIndex: "response_status",
      width: "150px",
    },
    {
      title: "response_payload",
      dataIndex: "response_payload",
      width: "40%",
      ellipsis: true,
    },
  ];

  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ color: "#ffffff" }}>Client App</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <MessageOutlined />,
              label: "Dispatch logs",
            },
            {
              key: "2",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick: async () => {
                await fetch("/api/logout");
                return router.push("/");
              },
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          Dispatch logs
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
          }}
        >
          <Table columns={columns} dataSource={props.data as any} />
        </Content>
      </Layout>
    </Layout>
  );
}
