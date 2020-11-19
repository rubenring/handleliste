import Products from "../database/schemas/product.js";

export const getProductsWithUser = async () => {
  return Products.find().populate({ path: "User" });
};

export const getProductById = async (id) => {
  const product = await Products.findById(id);
  if (product === null) {
    throw new Error(`no product with id ${id}`);
  }
  return product;
};
export const checkIfProductExists = async (filter) => {
  return Products.exists(filter);
};
export const throwIfProductNotExists = async (filter) => {
  const excists = checkIfProductExists(filter);
  if (!excists) {
    throw new Error(
      `product with searchfilter ${JSON.stringify(filter)} already excists`
    );
  }
};
export const throwIfProductExists = async (filter) => {
  const excists = await Products.exists({
    name: name,
  });
  if (excists) {
    throw new Error(
      `product with searchfilter ${JSON.stringify(filter)} does not excists`
    );
  }
};
export const updateProduct = async (filter, update) =>
  Products.updateOne(filter, update);

export const deleteProduct = async (filter) => {
  //TODO: Add check to see if product exists in listitem;
  const status = Products.deleteOne(filter);
  if (status.deletedCount === 0) throw new Error("no product deleted");
};
