import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, Product } from './schemas/product.schema';
import { ConfigModule } from '@nestjs/config';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AuthModule, 
    ConfigModule, 
  ],
  controllers: [ProductsController],
  providers: [ProductsService, AdminGuard],
})
export class ProductsModule {}
