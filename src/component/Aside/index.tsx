import * as React from 'react';
import { withRouter } from 'react-router';
import { Menu } from 'antd';
import menuConfig, { NavFormat } from 'constants/menuConfig';
import './index.scss';

const SubMenu = Menu.SubMenu;

class Aside extends React.Component<any, any> {
    state = {
        // eslint-disable-next-line
        expandSubMenuKey: new Array(),
        selectedKey: '',
    };
    componentWillReceiveProps(nextProps: any) {
        const navPath = nextProps.location.pathname.split('/');
        this.updateActiveMenu(navPath);
    }
    updateActiveMenu = (navPath: string[]) => {
        // menu item key max length eq 3
        if (navPath.length > 3) {
            navPath = navPath.slice(0, 3);
        }
        this.setState({
            selectedKey: navPath.join('/'),
        });
        this.checkExpandubMune();
    }

    generateMenu = (config: NavFormat[]) => {
        if (!config.length) {
            return null;
        }
        return config.map((itemConfig) => {
            if (itemConfig.children && itemConfig.children.length > 0) {
                return this.generatorSubMenu(itemConfig);
            }
            return this.generatorMenuItem(itemConfig);
        });
    }

    generatorSubMenu = (subMenuConfig: NavFormat) => {
        return (
            <SubMenu
                key={subMenuConfig.route}
                title={<span className="sub-item"><span className={`menu-icon ${subMenuConfig.icon}`} /><span>{subMenuConfig.label}</span></span>}
                onTitleClick={this.changeExpand}
            >
                {
                    subMenuConfig.children ? this.generateMenu(subMenuConfig.children) : ''
                }
            </SubMenu>
        );
    }

    generatorMenuItem = (menuItemConfig: any) => {
        return (
            <Menu.Item key={menuItemConfig.route}>
                <span className={`menu-icon ${menuItemConfig.icon}`} />
                <span>{menuItemConfig.label}</span>
            </Menu.Item>
        );
    }

    changeRouteHandle = (e: any) => {
        this.setState({
            selectedKey: e.key,
        });
        this.props.history.replace(e.key);
    }

    changeExpand = (e: any) => {
        const { expandSubMenuKey } = this.state;
        const newExpand: any = [];
        if (expandSubMenuKey.indexOf(e.key) < 0) {
            newExpand.push(e.key);
        }
        this.setState({
            expandSubMenuKey: newExpand,
        });
    }

    checkExpandubMune = () => {
        // menuConfig.map(m => {
        //     m.children.map((s: any) => {
        //         if (s.route.indexOf(this.props.location.pathname) > -1) {
        //             this.setState({
        //                 expandSubMenuKey: [m.route],
        //             });
        //         }
        //     });
        // });
    }
    render() {
        const { expandSubMenuKey, selectedKey } = this.state;
        return (
            <div className="m-layout-aside">
                <Menu
                    onClick={this.changeRouteHandle}
                    openKeys={expandSubMenuKey}
                    selectedKeys={[selectedKey]}
                    mode="inline"
                >
                    {
                        this.generateMenu(menuConfig)
                    }
                </Menu>
            </div>
        );
    }
}

export default withRouter(Aside as any);
