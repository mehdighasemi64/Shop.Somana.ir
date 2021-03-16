// import React, { Component } from 'react';
// import Menu, { SubMenu, MenuItem } from 'rc-menu';
// import { Link } from "react-router-dom";

// const nestSubMenu = (
//     <SubMenu
//         title={<span className="submenu-title-wrapper">offset sub menu 2</span>}
//         key="4"
//         popupOffset={[10, 15]}
//     >
//         <MenuItem key="4-1">inner inner</MenuItem>
//         {/* <Divider /> */}
//         <SubMenu
//             key="4-2"
//             title={<span className="submenu-title-wrapper">sub menu 1</span>}
//         >
//             <SubMenu
//                 title={<span className="submenu-title-wrapper">sub 4-2-0</span>}
//                 key="4-2-0"
//             >
//                 <MenuItem key="4-2-0-1">inner inner</MenuItem>
//                 <MenuItem key="4-2-0-2">inner inner2</MenuItem>
//             </SubMenu>
//             <MenuItem key="4-2-1">inn</MenuItem>
//             <SubMenu
//                 title={<span className="submenu-title-wrapper">sub menu 4</span>}
//                 key="4-2-2"
//             >
//                 <MenuItem key="4-2-2-1">inner inner</MenuItem>
//                 <MenuItem key="4-2-2-2">inner inner2</MenuItem>
//             </SubMenu>
//             <SubMenu
//                 title={<span className="submenu-title-wrapper">sub menu 3</span>}
//                 key="4-2-3"
//             >
//                 <MenuItem key="4-2-3-1">inner inner</MenuItem>
//                 <MenuItem key="4-2-3-2">inner inner2</MenuItem>
//             </SubMenu>
//         </SubMenu>
//     </SubMenu>
// );
// const children1 = [

//     <MenuItem key="2"><Link to='/'>Home</Link></MenuItem>,

//     <SubMenu
//         title={<span className="submenu-title-wrapper">Our Products</span>}
//         key="1"
//     >
       
//         <MenuItem key="1-1"> <Link to='/Product'>Pen</Link></MenuItem>
//         <MenuItem key="1-2"><Link to='/Product'>Pencil</Link></MenuItem>
//         <MenuItem key="1-2"><Link to='/Product'>Marker</Link></MenuItem>
//     </SubMenu>,

//     nestSubMenu,

//     <MenuItem key="3">outer</MenuItem>,
//     <MenuItem key="5" disabled>
//         disabled
//     </MenuItem>,
// ];

// const children2 = [
//     <SubMenu
//         title={<span className="submenu-title-wrapper">sub menu</span>}
//         key="1"
//     >
//         <MenuItem key="1-1">0-1</MenuItem>
//         <MenuItem key="1-2">0-2</MenuItem>
//     </SubMenu>,
//     <MenuItem key="2">1</MenuItem>,
//     <MenuItem key="3">outer</MenuItem>,
// ];



// const customizeIndicator = <span>Add More Items</span>;

// function handleClick(info) {
//     console.log(`clicked ${info.key}`);
//     console.log(info);
//     alert(info.key)
// }

// function onOpenChange(value) {
//     console.log('onOpenChange', value);
// }

// class CommonMenu extends Component {

//     constructor(props) {
//         super(props);
//     }

//     state = {
//         children: children1,
//         overflowedIndicator: undefined,
//     };

//     toggleChildren = () => {
//         this.setState(({ children }) => ({
//             children: children === children1 ? children2 : children1,
//         }));
//     };

//     toggleOverflowedIndicator = () => {
//         this.setState(({ overflowedIndicator }) => ({
//             overflowedIndicator:
//                 overflowedIndicator === undefined ? customizeIndicator : undefined,
//         }));
//     };

//     render() {
//         const { triggerSubMenuAction } = this.props;
//         const { children, overflowedIndicator } = this.state;
//         return (
//             <div>
//                 {this.props.updateChildrenAndOverflowedIndicator && (
//                     <div>
//                         <button type="button" onClick={this.toggleChildren}>
//                             toggle children
//                         </button>
//                         <button type="button" onClick={this.toggleOverflowedIndicator}>
//                             toggle overflowedIndicator
//                         </button>
//                     </div>
//                 )}
//                 <Menu
//                     onClick={handleClick}
//                     triggerSubMenuAction={triggerSubMenuAction}
//                     onOpenChange={onOpenChange}
//                     selectedKeys={['3']}
//                     mode={this.props.mode}
//                     openAnimation={this.props.openAnimation}
//                     defaultOpenKeys={this.props.defaultOpenKeys}
//                     overflowedIndicator={overflowedIndicator}
//                     motion={this.props.motion}

//                 >
//                     {children}
//                 </Menu>
//             </div>
//         );
//     }
// }

// export default CommonMenu;


import React, { Component } from 'react';
import Menu, { SubMenu, MenuItem } from 'rc-menu';
import { Link } from "react-router-dom";

const nestSubMenu = (
    <SubMenu
        title={<span className="submenu-title-wrapper">offset sub menu 2</span>}
        key="4"
        popupOffset={[10, 15]}
    >
        <MenuItem key="4-1">inner inner</MenuItem>
        {/* <Divider /> */}
        <SubMenu
            key="4-2"
            title={<span className="submenu-title-wrapper">sub menu 1</span>}
        >
            <SubMenu
                title={<span className="submenu-title-wrapper">sub 4-2-0</span>}
                key="4-2-0"
            >
                <MenuItem key="4-2-0-1">inner inner</MenuItem>
                <MenuItem key="4-2-0-2">inner inner2</MenuItem>
            </SubMenu>
            <MenuItem key="4-2-1">inn</MenuItem>
            <SubMenu
                title={<span className="submenu-title-wrapper">sub menu 4</span>}
                key="4-2-2"
            >
                <MenuItem key="4-2-2-1">inner inner</MenuItem>
                <MenuItem key="4-2-2-2">inner inner2</MenuItem>
            </SubMenu>
            <SubMenu
                title={<span className="submenu-title-wrapper">sub menu 3</span>}
                key="4-2-3"
            >
                <MenuItem key="4-2-3-1">inner inner</MenuItem>
                <MenuItem key="4-2-3-2">inner inner2</MenuItem>
            </SubMenu>
        </SubMenu>
    </SubMenu>
);


const children1 = [

    <MenuItem key="2"><Link to='/'>Home</Link></MenuItem>,

    <SubMenu
        title={<span className="submenu-title-wrapper">Our Products</span>}
        key="1"
    >
       
        <MenuItem key="1-1"> <Link to='/Product'>Pen</Link></MenuItem>
        <MenuItem key="1-2"><Link to='/Product'>Pencil</Link></MenuItem>
        <MenuItem key="1-2"><Link to='/Product'>Marker</Link></MenuItem>
    </SubMenu>,

    nestSubMenu,

    <MenuItem key="3">outer</MenuItem>,
    <MenuItem key="5" disabled>
        disabled
    </MenuItem>,
];

const children2 = [
    <SubMenu
        title={<span className="submenu-title-wrapper">sub menu</span>}
        key="1"
    >
        <MenuItem key="1-1">0-1</MenuItem>
        <MenuItem key="1-2">0-2</MenuItem>
    </SubMenu>,
    <MenuItem key="2">1</MenuItem>,
    <MenuItem key="3">outer</MenuItem>,
];



const customizeIndicator = <span>Add More Items</span>;

function handleClick(info) {
    console.log(`clicked ${info.key}`);
    console.log(info);
    alert(info.key)
}

function onOpenChange(value) {
    console.log('onOpenChange', value);
}

class CommonMenu extends Component {

    constructor(props) {
        super(props);
    }
    
    state = {
        children: children1,
        overflowedIndicator: undefined,
    };

    toggleChildren = () => {
        this.setState(({ children }) => ({
            children: children === children1 ? children2 : children1,
        }));
    };

    toggleOverflowedIndicator = () => {
        this.setState(({ overflowedIndicator }) => ({
            overflowedIndicator:
                overflowedIndicator === undefined ? customizeIndicator : undefined,
        }));
    };

    render() {
        const { triggerSubMenuAction } = this.props;
        const { children, overflowedIndicator } = this.state;
        return (
            <div>
                {this.props.updateChildrenAndOverflowedIndicator && (
                    <div>
                        <button type="button" onClick={this.toggleChildren}>
                            toggle children
                        </button>
                        <button type="button" onClick={this.toggleOverflowedIndicator}>
                            toggle overflowedIndicator
                        </button>
                    </div>
                )}
                <Menu
                    onClick={handleClick}
                    triggerSubMenuAction={triggerSubMenuAction}
                    onOpenChange={onOpenChange}
                    selectedKeys={['3']}
                    mode={this.props.mode}
                    openAnimation={this.props.openAnimation}
                    defaultOpenKeys={this.props.defaultOpenKeys}
                    overflowedIndicator={overflowedIndicator}
                    motion={this.props.motion}

                >
                    {children}
                </Menu>
            </div>
        );
    }
}

export default CommonMenu;