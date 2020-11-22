import Products from "../database/schemas/product.js";
import { BadRequest, DatabaseError, NotFound } from "../Errors/CustomError.js";
export const getProductsWithUser = async () => {
  try {
    return Products.find().populate({ path: "User" });
  } catch (e) {
    throw new DatabaseError(e.message);
  }
};

export const getProductById = async (id) => {
  const product = await Products.findById(id);
  if (product === null) {
    throw new NotFound(`no product with id ${id}`);
  }
  return product;
};
export const checkIfProductExists = async (filter) => {
  return Products.exists(filter);
};
export const throwIfProductNotExists = async (filter) => {
  const excists = checkIfProductExists(filter);
  if (!excists) {
    throw new BadRequest(
      `product with searchfilter ${JSON.stringify(filter)} already excists`
    );
  }
};
export const throwIfProductExists = async (filter) => {
  const excists = await Products.exists({
    name: name,
  });
  if (excists) {
    throw new BadRequest(
      `product with searchfilter ${JSON.stringify(filter)} does not excists`
    );
  }
};
export const updateProduct = async (name, price, id) => {
  try {
    if (!price && !name) {
      throw new NotFound("no fields to update");
    }
    const update = {
      updatedBy: id,
    };
    const filter = { _id: id };
    if (name) update.name = name;
    if (price) update.price = price;
    await Products.updateOne(filter, update);
    return getProductById(id);
  } catch (e) {
    throw new DatabaseError(e.message);
  }
};

export const deleteProduct = async (filter) => {
  //TODO: Add check to see if product exists in listitem;
  try {
    const status = Products.deleteOne(filter);
    if (status.deletedCount === 0) throw new NotFound("No product deleted");
  } catch (e) {
    throw new DatabaseError(e.message);
  }
};
export const createProduct = async (price, name, id) => {
  if (!price) {
    throw new BadRequest("price not set");
  } else if (!name) {
    throw new BadRequest("name not set");
  }
  await throwIfProductExists({
    name: name,
  });

  const product = new Products({
    name: name,
    price: price,
    createdBy: id,
  });
  const createdProduct = await product.save();
  return getProductById(createdProduct._id);
};
