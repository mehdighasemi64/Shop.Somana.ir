const initState = {
    items: []
}

const ProductCategoryReducer = (state = initState, action) => {
    debugger;
    switch (action.type) {
        case "INIT_PRODUCTCATEGORYLIST":
            debugger;            
            var s = Object.assign({}, state);
            for (var i = 0; i < action.item.length; i++) {
                s.items.push(action.item[i]);
            }
            return s;       

        default:
            return state;
    }
}
export default ProductCategoryReducer;
