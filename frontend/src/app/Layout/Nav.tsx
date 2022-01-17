import React, {FC, memo, useState} from "react";
import {Layout, Menu} from "antd";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
} from "@ant-design/icons";

const {Sider} = Layout;

export const Nav: FC = memo(() => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const onCollapse = (collapsed: boolean) => setIsCollapsed(collapsed)

    return (
        <Sider collapsible collapsed={isCollapsed} onCollapse={onCollapse}>
            <div className='logo' />
            <Menu theme='dark' defaultSelectedKeys={["1"]} mode='inline'>
                <Menu.Item key='1' icon={<PieChartOutlined />}>
                    Option 1
                </Menu.Item>
                <Menu.Item key='2' icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <Menu.Item key='9' icon={<FileOutlined />}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
    );
});
