
debugger;
if (sessionStorage.getItem('sessionStorageUser') == null) {
    sessionStorage.setItem('sessionStorageUser', JSON.stringify({
        items: [],
    }))
}
else {
    sessionStorage.getItem('sessionStorageUser')
}
const initState = (sessionStorage.getItem('sessionStorageUser'));


const UserReducer = (state = JSON.parse(initState), action) => {
    //debugger;
    switch (action.type) {

        case "INITUSER":
            debugger;
            var s = Object.assign({}, state);
            return s;

        case "ADDUSER":
            debugger;
            var s = Object.assign({}, state);
            s = action.item;
            return s;

        case "DELETUSER":
            debugger;
            var s = Object.assign({}, state);
            s.items = s.items.filter(item => item.id == action.item);
            return s;

        // case "LOGIN":
        //     debugger;
        //     var a = [];
        //     // Parse the serialized data back into an aray of objects
        //     a = JSON.parse(sessionStorage.getItem('sessionStorageUser')) || [];
        //     // Push the new data (whether it be an object or anything else) onto the array
        //     a.items.push(action.item[0]);
        //     // Alert the array value
        //     // alert(a);  // Should be something like [Object array]
        //     // Re-serialize the array back into a string and store it in localStorage
        //     sessionStorage.setItem('sessionStorageUser', JSON.stringify(a));

        //     var s = Object.assign({}, state);
        //     s.items = action.item[0];
        //     return s;

        case "LOGIN":
            debugger;
            var a = [];
            // Parse the serialized data back into an aray of objects
            a = JSON.parse(sessionStorage.getItem('sessionStorageUser')) || [];
            // Push the new data (whether it be an object or anything else) onto the array
            a.items.push(action.item[0]);
            // Alert the array value
            // alert(a);  // Should be something like [Object array]
            // Re-serialize the array back into a string and store it in localStorage
            sessionStorage.setItem('sessionStorageUser', JSON.stringify(a));

            var s = Object.assign({}, state);
            s.items[0] = action.item[0];
            return s;
            

        case "LOGOUT":
            debugger;

            debugger;
            var a = [];
            // Parse the serialized data back into an aray of objects
            a = JSON.parse(sessionStorage.getItem('sessionStorageUser')) || [];
            // Push the new data (whether it be an object or anything else) onto the array
            a.items = [];
            // Alert the array value
            // alert(a);  // Should be something like [Object array]
            // Re-serialize the array back into a string and store it in localStorage
            sessionStorage.setItem('sessionStorageUser', JSON.stringify(a));

            var s = Object.assign({}, state);
            s.items = [];
            return s;

            // sessionStorage.setItem('sessionStorageUser', null);
            // var s = Object.assign({}, state);
            // s.items[0] = null;
            // return s;

        default:
            return state;
    }
}
export default UserReducer;
