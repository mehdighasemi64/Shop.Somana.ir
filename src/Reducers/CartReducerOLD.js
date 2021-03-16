
import Item1 from '../images/Products/ColoredPencil/1.jpg';
import Item2 from '../images/Products/ColoredPencil/2.jpg';
import Item3 from '../images/Products/ColoredPencil/3.jpg';
import Item4 from '../images/Products/ColoredPencil/4.jpg';
import Item5 from '../images/Products/ColoredPencil/5.jpg';
import Item6 from '../images/Products/ColoredPencil/6.jpg';

// const initState = {
//     items: [
//         { id: 1, title: 'Winter body', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 110, quantity: 1, img: Item1 },
//         { id: 5, title: 'Adidas', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 80, quantity: 1, img: Item2 },
//     ],
//     total: 0
// }


// localStorage.getItem('localtestxxx') == null ? localStorage.setItem('localtestxxx', JSON.stringify({
//     items: [ ],
//     total: 0
// })):localStorage.getItem('localtestxxx');

if (sessionStorage.getItem('sessionStoragetest') == null) {
    sessionStorage.setItem('sessionStoragetest', JSON.stringify({
            items: [ ],
            total: 0
        }))
}
else {
    sessionStorage.getItem('sessionStoragetest')
}

const initState = (sessionStorage.getItem('sessionStoragetest'));

const cartReducer = (state = JSON.parse(initState), action) => {
   // debugger;
    switch (action.type) {

        case "INIT_CARTLIST":
            debugger;
            var s = Object.assign({}, state.items);
            var sum = 0;
            for (var i = 0; i < s.items.length; i++) {
                sum = sum + s.items[i].price * s.items[i].quantity;
            }
            s.total = sum;
            return s;

        case "ADD_CARTLIST":
            debugger;
            var a = [];
            // Parse the serialized data back into an aray of objects
            a = JSON.parse(sessionStorage.getItem('sessionStoragetest')) || [];
            // Push the new data (whether it be an object or anything else) onto the array
            a.items.push(action.item);
            // Alert the array value
            // alert(a);  // Should be something like [Object array]
            // Re-serialize the array back into a string and store it in localStorage
            sessionStorage.setItem('sessionStoragetest', JSON.stringify(a));

            var sum = 0;
            var s = Object.assign({}, state);
            s.items = [...s.items, action.item.id];

            for (var i = 0; i < s.items.length; i++) {
                sum = sum + s.items[i].price * s.items[i].quantity;
            }
            s.total = sum;
            return s;

       

        // case "SUB_CARTLIST":
        //     debugger;
        //     var s = Object.assign({}, state);
        //     s.total = s.total - action.item.price * action.item.quantity;
        //     s.items = s.items.filter(items => items.id !== action.item.id);
        //     return s;

        case "SUB_CARTLIST":
            debugger;
            var a = [];
            // Parse the serialized data back into an aray of objects
            a = JSON.parse(sessionStorage.getItem('sessionStoragetest')) || [];
            // Push the new data (whether it be an object or anything else) onto the array
            a.items = a.items.filter(item => item.id !== action.item.id);
            // Alert the array value
            // alert(a);  // Should be something like [Object array]
            // Re-serialize the array back into a string and store it in localStorage
            sessionStorage.setItem('sessionStoragetest', JSON.stringify(a));

            var s = Object.assign({}, state);
            s.total = s.total - action.item.price * action.item.quantity;
            s.items = s.items.filter(items => items.id !== action.item.id);
            return s;

      

        case "ADD_ITEMQUANTITYCART":
            debugger;
            var s = { items: [], total: 0 };
            var sum = 0;

            for (var i = 0; i < state.items.length; i++) {
                var item = Object.assign({}, state.items[i]);
                if (item.id === action.item) {
                    item.quantity++;
                }
                s.items.push(item);
            }

            for (var i = 0; i < s.items.length; i++) {
                sum = sum + s.items[i].price * s.items[i].quantity;
            }
            s.total = sum;

            sessionStorage.setItem('sessionStoragetest', JSON.stringify(s));

            return s;


        case "SUB_ITEMQUANTITYCART":
            debugger;
            var s = { items: [], total: 0 };
            var sum = 0;

            for (var i = 0; i < state.items.length; i++) {
                var item = Object.assign({}, state.items[i]);
                if (item.id === action.item) {
                    item.quantity--;
                }
                s.items.push(item);
            }
            for (var i = 0; i < s.items.length; i++) {
                sum = sum + s.items[i].price * s.items[i].quantity;
            }
            s.total = sum;

            sessionStorage.setItem('sessionStoragetest', JSON.stringify(s));

            return s;

        default:
            return state;
    }

}
export default cartReducer;