// import React from 'react';
// import { Link } from "react-router-dom";

// export default function MyMenu() {
//     return (
//         <div>
//             <div style={{ display: "flex", justifyContent: "center" }}>
//                 <button>
//                     <Link to='/'>Home</Link>
//                 </button>
//                 <button>
//                     <Link to='/Product'>Our Products</Link>
//                 </button>
//                 <button>
//                     <Link to='/'>About us</Link>
//                 </button>
//                 <button>
//                     <Link to='/'>Certificates</Link>
//                 </button>
//                 <button>
//                     <Link to='/'>Contact us</Link>
//                 </button>
//             </div>
//         </div>
//     );
// }


import React, { useEffect } from 'react';
import CommonMenu from './CommonMenu'
// import animate from 'css-animation';
import 'rc-menu/assets/index.css';

const collapseNode = () => ({ height: 0 });
const expandNode = node => ({ height: node.scrollHeight });

const inlineMotion = {
    motionName: 'rc-menu-collapse',
    onAppearStart: collapseNode,
    onAppearActive: expandNode,
    onEnterStart: collapseNode,
    onEnterActive: expandNode,
    onLeaveStart: expandNode,
    onLeaveActive: collapseNode,
};

const horizontalMenu = (
    <CommonMenu
        mode="horizontal"
        openAnimation="slide-up"
    />
);

const verticalMenu = <CommonMenu mode="vertical" openAnimation="zoom" />;

const inlineMenu = (
    <CommonMenu mode="inline" defaultOpenKeys={['1']} motion={inlineMotion} />
);

export default function MyMenu() {

    useEffect(() => {
    }, []);



    return (
        <div style={{ margin: 0 }}>
            <div>
                <div style={{ margin: 20 }}>{horizontalMenu}</div>              
            </div>
        </div>
    );
}

