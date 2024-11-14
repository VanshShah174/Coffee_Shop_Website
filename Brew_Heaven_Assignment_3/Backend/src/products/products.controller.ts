import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Only admin can add a new product
  @UseGuards(AdminGuard)
  @Post('add')
  async create(@Body() productDto): Promise<Product> {
    return this.productsService.create(productDto);
  }

  // Accessible to everyone: Fetch all products
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  // Accessible to everyone: Fetch a single product by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  // Only admin can update a product
  @UseGuards(AdminGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() productDto): Promise<Product> {
    return this.productsService.update(id, productDto);
  }

  // Only admin can delete a product
  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Product> {
    return this.productsService.delete(id);
  }
}
