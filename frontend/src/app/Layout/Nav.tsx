import React, {FC, memo} from "react";
import {Layout, Menu} from "antd";
import {Link, useLocation} from "react-router-dom";
import {Paths} from "../../constants/routes";

const {Sider} = Layout;

export const Nav: FC = memo(() => {
    const location = useLocation();

    return (
        <Sider>
            <div className='logo' />
            <Menu theme='dark' defaultSelectedKeys={[location.pathname]} mode='inline'>
                <Menu.Item key={Paths.TRANSFORMERS}>
                    <Link to={Paths.TRANSFORMERS}>
                        Transformers
                    </Link>
                </Menu.Item>
                <Menu.Item key={Paths.BASES}>
                    <Link to={Paths.BASES}>
                        Bases
                    </Link>
                </Menu.Item>
                <Menu.Item key={Paths.UPGRADES}>
                    <Link to={Paths.UPGRADES}>
                        Upgrades
                    </Link>
                </Menu.Item>
                <Menu.Item key={Paths.BATTLE_FIELDS}>
                    <Link to={Paths.BATTLE_FIELDS}>
                        Battle fields
                    </Link>
                </Menu.Item>
                <Menu.Item key={Paths.INSPECTIONS}>
                    <Link to={Paths.INSPECTIONS}>
                        Inspections
                    </Link>
                </Menu.Item>
                <Menu.Item key={Paths.TRANSPORT}>
                    <Link to={Paths.TRANSPORT}>
                        Transport
                    </Link>
                </Menu.Item>
                <Menu.Item key={Paths.WEAPONS}>
                    <Link to={Paths.WEAPONS}>
                        Weapons
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
});
