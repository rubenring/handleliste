import ShoppinglistItem from "../database/schemas/shoppingListItem";

export const getShoppinglistItemById = async (id) => {
  const shoppinglistitem = await ShoppinglistItem.findById(id);
  if (!shoppinglistitem) throw new Error(`no shoppinglistitem with id ${id}`);
  return shoppinglistitem;
};
export const checkIfShoppinglistItemExists = async (filter) => {
  return ShoppinglistItem.exists(filter);
};
export const throwIfShoppinglistItemtNotExists = async (filter) => {
  const excists = checkIfShoppinglistItemExists(filter);
  if (!excists) {
    throw new Error(
      `ShoppinglistItem with searchfilter ${JSON.stringify(
        filter
      )} already excists`
    );
  }
};
export const throwIfShoppinglistItemExists = async (filter) => {
  const excists = checkIfShoppinglistItemExists(filter);
  if (excists) {
    throw new Error(
      `ShoppinglistItem with searchfilter ${JSON.stringify(
        filter
      )} does not excists`
    );
  }
};

export const createShoppinglistItem = async (productId, qty, userId) => {
  const shoppinglistItem = new ShoppinglistItem({
    product: productId,
    qty: qty | 1,
    createdBy: userId,
  });
  const saved = shoppinglistItem.save();
  return getShoppinglistItemById(saved.id);
};

export const deleteAllItemsInShoppinglist = async (ids) => {
  //TODO: Add check to see if product exists in listitem;
  try {
    return ShoppinglistItem.deleteMany({
      _id: {
        $in: shoppingListItemIds,
      },
    });
  } catch (e) {
    throw new DatabaseError(e.message);
  }
};
