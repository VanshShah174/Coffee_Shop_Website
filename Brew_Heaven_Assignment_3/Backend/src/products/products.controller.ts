import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('add')
  create(@Body() productDto): Promise<Product> {
    return this.productsService.create(productDto);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() productDto): Promise<Product> {
    return this.productsService.update(id, productDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Product> {
    return this.productsService.delete(id);
  }
}
