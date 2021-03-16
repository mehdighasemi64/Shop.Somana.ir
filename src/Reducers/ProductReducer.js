
// import Item1 from '../images/Products/ColoredPencil/1.jpg';
// import Item2 from '../images/Products/ColoredPencil/2.jpg';
// import Item3 from '../images/Products/ColoredPencil/3.jpg';
// import Item4 from '../images/Products/ColoredPencil/4.jpg';
// import Item5 from '../images/Products/ColoredPencil/5.jpg';
// import Item6 from '../images/Products/ColoredPencil/6.jpg';

// const initState = {
//     items: [
//         { id: 1, title: 'Winter body', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", quantity: 1, price: 110, img: Item1 },
//         { id: 2, title: 'Adidas', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", quantity: 1, price: 80, img: Item2 },
//         { id: 3, title: 'Vans', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", quantity: 1, price: 1000, img: Item3 },
//         { id: 4, title: 'White', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", quantity: 1, price: 260, img: Item4 },
//         { id: 5, title: 'Cropped-sho', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", quantity: 1, price: 160, img: Item5 },
//         { id: 6, title: 'Blues', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", quantity: 1, price: 90, img: Item6 }
//     ]

// }

const initState = {
    items: []
}

const ProductReducer = (state = initState, action) => {
    debugger;
    switch (action.type) {

        case "INIT_PRODUCTLIST":
            debugger;            
            var s = Object.assign({}, state);
            for (var i = 0; i < action.item.length; i++) {
                s.items.push(action.item[i]);
            }
            debugger;
            return s;


        /// it was a wrong method because it returns whole state with just one record for ever.
        ///.instaed of it I filtered the state in productdetail page
        //REDUCER ALWAYS RETURN THE LAST CHANGE

        // case "BIND_PRODUCTDETAIL":
        //     debugger;
        //     var s = Object.assign({}, state);
        //     s.items = s.items.filter(item => item.id == action.item);
        //     return s;

        default:
            return state;
    }
}
export default ProductReducer;
