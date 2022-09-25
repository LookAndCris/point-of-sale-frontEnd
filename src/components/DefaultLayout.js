import {
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "../styles/DefaultLayout.css";
import React, { useState } from "react";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  // useSate hook
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      {/* Esta zona es la sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* Esta parte 👇 se puede modificar o ubicar el logo. 🐺 */}
        <div className="logo">
          <h1 className="text-center text-light font-wight-bold mt-4">POS</h1>
        </div>
        <Menu
          // Podemos elegir entre un tema oscuro 🌙 o el tema claro 🌞 o modificarlo con CSS.
          theme="dark"
          mode="inline"
          // La  propiedad window.locate.pathname nos ayuda en la selección del contenido a mostrar.
          defaultSelectedKeys={window.location.pathname}
        >
          {/* Cada uno de los siguientes ítems 📦 muestra un lugar 🎯 en la navegación, solo copiando y pegando se puede reutilizar fácilmente 😀.  */}
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/items">Items</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/* En este lugar tenemos el botón para desplegar la 💁‍♂️ sidebar, en esta parte podemos crear también algún tipo de menú 📝 para la navegación 🚢 o poner algún mensaje, también es un buen lugar para ubicar publicidad 📣 si se requiere.   */}
        <Header className="site-layout-background">
          {React.createElement(
            // Sí es falso mostrara el icono de salida, por el contrario si es verdadero mostrara el icono de colapsar.
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        {/* Esta es la zona de contenido  👇*/}
        <Content
          className="site-layout-background"
          style={{
            margin: "10px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* Al traer las props como children 👨‍👧‍👧, todo lo que el default layout sea su padre  será renderizado en la zona de contenido. */}
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
