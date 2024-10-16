import React from 'react';

import {ConfigProvider} from "antd";
import {AppTheme} from "../themes/AppTheme";


interface Props {
    children: React.ReactNode;
}

const CombinedProviders: React.FC<Props> = ({ children }) => {
    return (
        <ConfigProvider theme={AppTheme.main}>
            {children}
        </ConfigProvider>
    );
};

export default CombinedProviders;
