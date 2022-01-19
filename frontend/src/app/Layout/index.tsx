import React, {FC, memo} from "react";
import {Layout} from "antd";
import {Nav} from "./Nav";

const {Content} = Layout;

export const LayoutWrapper: FC = memo(({children}) => {
    return (
        <Layout style={{minHeight: "100vh"}}>
            <Nav />
            <Layout className='site-layout'>
                <Content style={{margin: "0 16px"}}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
});
