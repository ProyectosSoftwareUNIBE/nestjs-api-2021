import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/')
  async createProduct(@Res() res, @Body() product: ProductDto) {
    try {
      const productResponse = await this.productService.crateProduct(product);
      res.status(HttpStatus.ACCEPTED).json(productResponse);
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: e.errors.name.message });
    }
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('/:productId')
  async getProductById(@Res() res, @Param('productId') productId: string) {
    if (productId.length !== 24)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'el producto no existe' });
    const product = await this.productService.getProductById(productId);
    if (!product)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'el producto no existe' });
    return res.status(HttpStatus.OK).json(product);
  }

  @Delete('/:productId')
  async deleteProductById(@Res() res, @Param('productId') productId: string) {
    if (productId.length !== 24)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'el producto no existe' });
    const product = await this.productService.deleteProductById(productId);
    if (!product)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'el producto no existe' });
    return res
      .status(HttpStatus.ACCEPTED)
      .json({ mesagge: 'producto eliminado', producto: product });
  }

  @Put('/:productId')
  async updateProductById(
    @Res() res,
    @Param('productId') productId: string,
    @Body() productDto: ProductDto,
  ) {
    if (productId.length !== 24)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'el producto no existe' });
    const product = await this.productService.updateProduct(
      productId,
      productDto,
    );
    if (!product)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'el producto no existe' });
    return res
      .status(HttpStatus.ACCEPTED)
      .json({ mesagge: 'producto actualizado', producto: product });
  }
}
