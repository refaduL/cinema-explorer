export function itemFoundInArray(itemsArray, itemId) {
    const found = itemsArray.find((item) => {
        return item.id === itemId;
    });
    return found;
}


