export const pricewithDiscount = (price, discount) => {
    if (price < 0 || discount < 0 || discount > 100) {
        throw new Error('Invalid price or discount value');
    }
    const discountPrice = (price * discount) / 100;
    const newPrice = price - discountPrice;
    return newPrice.toFixed(2); // Round to 2 decimal places
}
