import React, { useState, useEffect } from 'react';
import { initProductCategoryList } from './Actions';
import { useDispatch, useSelector } from "react-redux"; // new for Hook instead of connect
import Menu, { SubMenu, Divider, MenuItem } from 'rc-menu';
import { Link } from "react-router-dom";


export default function CommonMenu() {

    useEffect(() => {
        BindMenuItem();
    }, []);

    const dispatch = useDispatch();// This is mapDispatchToProps
    const ds = useSelector(state => state.ProductCategoryReducer); // this is mapStateToProps

    function nestSubMenuddd() {
        var xx =
            <SubMenu
                title={<span className="submenu-title-wrapper">offset sub menu 2</span>}
                key="4"
                popupOffset={[10, 15]}
            >
                <MenuItem key="4-1">inner inner</MenuItem>
                <Divider />
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
            </SubMenu>;

        debugger;
        return xx;

    }


    var menuitems = [
        <MenuItem><Link style={{textDecoration: "none"}} to='/'>Home</Link></MenuItem>,
        //  nestSubMenu(),
        PrimayMenuItems(),
        <MenuItem><Link style={{textDecoration: "none"}} to='/'>Services</Link></MenuItem>,
        <MenuItem><Link style={{textDecoration: "none"}} to='/'>Contact Us</Link></MenuItem>,
        <MenuItem><Link style={{textDecoration: "none"}} to='/'>About Us</Link></MenuItem>,
    ];


    function PrimayMenuItems() {
        var yy =
            <SubMenu
                title={<span className="submenu-title-wrapper"><Link to={"/Product/"}>Our Products</Link></span>}
                popupOffset={[10, 15]}
            >
                <Divider />

                {
                    ds.items.filter(item => item.ParentId == null).map(item => {
                        return (
                            <SubMenu
                                key={item.ProductCategoryId}
                                title={<span className="submenu-title-wrapper" ><Link to={"/Product/" + item.ProductCategoryId}>{item.ProductCategoryNameEN}</Link></span>}
                            >
                                {BuildSubMenu(item.ProductCategoryId)}
                            </SubMenu>
                        )                                              
                    })
                }
            </SubMenu>;
        return yy;
    }

    function BuildSubMenu(CategoryId) {
        debugger;
        return (
            ds.items.filter(item => item.ParentId == CategoryId).map(item => {
                return (
                    <MenuItem isSelected={false} key={item.ProductCategoryId}><Link to={"/Product/" + item.ProductCategoryId}>{item.ProductCategoryNameEN}</Link></MenuItem>
                )
            })
        )
    }

    function BindMenuItem() {
        debugger;
        //fetch('http://localhost:33511/api/Category/AllProductCategory/', {
         // fetch('http://localhost:5000/api/Category/AllProductCategory/', {
            fetch('http://shop.somana.ir/api/Category/AllProductCategory/', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
        })
            .then(response => response.json())
            .then(response => dispatch(initProductCategoryList(response)))
            .catch(e => alert(e));
    }

    function handleClick(info) {
        console.log(`clicked ${info.key}`);
        console.log(info);
        //alert(info.key)
    }

    function onOpenChange(value) {
        console.log('onOpenChange', value);
    }


    return (
        <div>
            <Menu
                onClick={handleClick}
                // triggerSubMenuAction={triggerSubMenuAction}
                onOpenChange={onOpenChange}
                // selectedKeys={['3']}
                mode={"horizontal"}
                openAnimation={"zoom"}
                
            // overflowedIndicator={overflowedIndicator}
            // motion={this.props.motion}

            >
                {menuitems}
            </Menu>
        </div>
    );
}












