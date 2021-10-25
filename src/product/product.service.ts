import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModule: Model<ProductDocument>,
  ) {}

  async crateProduct(productDto: ProductDto): Promise<ProductDto> {
    const newProduct = new this.productModule(productDto);
    return newProduct.save();
  }

  async getProducts(): Promise<ProductDocument[]> {
    const products = await this.productModule.find();
    return products;
  }

  async getProductById(id: string): Promise<ProductDocument> {
    const product = await this.productModule.findById(id);
    return product;
  }

  async deleteProductById(id: string): Promise<ProductDocument> {
    const product = await this.productModule.findByIdAndDelete(id);
    return product;
  }

  async updateProduct(id: string, productDto: ProductDto): Promise<Product> {
    const product = await this.productModule.findByIdAndUpdate(id, productDto);
    return product;
  }
}
