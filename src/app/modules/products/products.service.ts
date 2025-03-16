import { StatusCodes } from 'http-status-codes';
import AppError from '../../../errors/AppError';
import { IProduct } from './products.interface';
import Product from './products.model';
import QueryBuilder from '../../builder/QueryBuilder';

const addProduct = async (payload: IProduct, sellerId: string) => {
  // Add seller id to product
  const data = {
    ...payload,
    sellerId,
  };
  // save to DB
  const result = await Product.create(data);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Product creation failed');
  }
  return result;
};
const getProduct = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(Product.find({}), query);
  const products = await queryBuilder
    .search(['location', 'title', 'category'])
    .filter()
    .sort()
    .paginate()
    .fields()
    .modelQuery.exec();

  const meta = await queryBuilder.countTotal();

  return { products, meta };
};
const getSingleProduct = async (id: string) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { $inc: { totalViews: 1 } },
    { new: true },
  );
  return product;
};
export const ProductsService = { addProduct, getProduct, getSingleProduct };
