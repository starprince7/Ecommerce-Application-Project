export const addItemToMyCart = (cart, newItem) => {
    const itemExits = cart.find((item) => item.id === newItem.id);
  
    if (itemExits) {
      console.log('Yes item Exits')
      // Re-create a New Array to be saved as the new cart OR
      // Update the quantity property while mapping through the cart
      const newArray = cart.map((item) =>
        item.id === newItem.id
          ? { ...item, quantity: (item.quantity + 1) }
          : item
      );
      console.log('The new Array b4 returning it!', newArray)
      return newArray;
    } else {
      console.log('No Item Does not exits')
      return [...cart, newItem];
    }
  };
  
  export const removeFromMyCart = (cart, newItem) => {
    let newCart = [...cart];

    //Find the Index first
    const index = cart.findIndex((item) => item.id === newItem);

    index >= 0
      ? newCart.splice(index, 1)
      : console.warn("prince trouble removing items");
    // Then return the new State!
    return newCart
  }
  
  export const increamentQty = (cart, ID) => {
    const newCart = [...cart];
    const newArray = newCart.map((item) =>
      item.id === ID
        ? { ...item, quantity: ( item.quantity + 1) }
        : item
    );
    return newArray;
  };
  
  export const decreamentQty = (cart, ID) => {
    const newCart = [...cart];
    const newArray = newCart.map((item) =>
      item.id === ID
        ? { ...item, quantity: ( item.quantity > 1 ? item.quantity - 1 : 1) }
        : item
    );
    return newArray;
  };