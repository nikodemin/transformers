import React, {FC, memo, useState} from "react";
import {Layout, Menu} from "antd";
import {Link, useLocation} from "react-router-dom";
import {
    DesktopOutlined,
    PieChartOutlined,
} from "@ant-design/icons";
import {Paths} from "../../constants/routes";

const {Sider} = Layout;

export const Nav: FC = memo(() => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const onCollapse = (collapsed: boolean) => setIsCollapsed(collapsed)
    const location = useLocation();

    return (
        <Sider collapsible collapsed={isCollapsed} onCollapse={onCollapse}>
            <div className='logo' />
            <Menu theme='dark' defaultSelectedKeys={[location.pathname]} mode='inline'>
                <Menu.Item key={Paths.TRANSFORMERS} icon={<PieChartOutlined />}>
                    <Link to={Paths.TRANSFORMERS}>
                        Transformers
                    </Link>
                </Menu.Item>
                <Menu.Item key={Paths.BASES} icon={<DesktopOutlined />}>
                    <Link to={Paths.BASES}>
                        Bases
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
});
