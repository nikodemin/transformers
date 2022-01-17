import React, {FC, memo} from "react";
import {Layout} from "antd";
import {Nav} from "./Nav";

const {Header, Content, Footer} = Layout;

export const LayoutWrapper: FC = memo(({children}) => {
    return (
        <Layout style={{minHeight: "100vh"}}>
            <Nav />
            <Layout className='site-layout'>
                <Header className='site-layout-background' style={{padding: 0}} />
                <Content style={{margin: "0 16px"}}>
                    {children}
                </Content>
                <Footer style={{textAlign: "center"}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
});
