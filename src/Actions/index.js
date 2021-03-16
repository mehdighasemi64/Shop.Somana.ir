export const initProductList = item => ({ type: "INIT_PRODUCTLIST", item: item});

export const initProductCategoryList = item => ({ type: "INIT_PRODUCTCATEGORYLIST", item: item});

export const initCartList = item => ({ type: "INIT_CARTLIST", item: item});

export const addToCartList = item => ({ type: "ADD_CARTLIST", item: item});

export const removeFromCartList = item => ({ type: "SUB_CARTLIST", item: item});

export const EmptyCartList = item => ({ type: "EMPTY_CARTLIST", item: item});

export const addItemQuantityCart = item => ({ type: "ADD_ITEMQUANTITYCART", item: item});

export const subItemQuantityCart = item => ({ type: "SUB_ITEMQUANTITYCART", item: item});

export const  bindProductDetail = item => ({ type: "BIND_PRODUCTDETAIL", item: item});

export const  LoginUser = item => ({ type: "LOGIN", item: item});

export const  LogOutUser = item => ({ type: "LOGOUT", item: item});

export const  BindCurrentUser = item => ({ type: "BINDCURRENTUSER", item: item});
