

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

    //debugger;
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
            s.items = [...s.items, action.item];

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
            a.items = a.items.filter(item => item.ProductId !== action.item.ProductId);
            // Alert the array value
            // alert(a);  // Should be something like [Object array]
            // Re-serialize the array back into a string and store it in localStorage
            sessionStorage.setItem('sessionStoragetest', JSON.stringify(a));

            var s = Object.assign({}, state);
            s.total = s.total - action.item.price * action.item.quantity;
            s.items = s.items.filter(items => items.ProductId !== action.item.ProductId);
            return s;

      

        case "ADD_ITEMQUANTITYCART":
            debugger;
            var s = { items: [], total: 0 };
            var sum = 0;

            for (var i = 0; i < state.items.length; i++) {
                var item = Object.assign({}, state.items[i]);
                if (item.ProductId === action.item) {
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
                if (item.ProductId === action.item) {
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

            case "EMPTY_CARTLIST":
            debugger;
            var s = { items: [], total: 0 };
            var sum = 0;            
            s.total = sum;
            sessionStorage.setItem('sessionStoragetest', JSON.stringify(s));
            return s;
            
        default:
            return state;
    }

}
export default cartReducer;