import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  // Create a new product
  async create(productDto): Promise<Product> {
    const product = new this.productModel(productDto);
    return product.save();
  }

  // Get all products
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // Get a single product by ID
  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  // Update a product by ID
  async update(id: string, productDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto, { new: true }).exec();
  }

  // Delete a product by ID
  async delete(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
