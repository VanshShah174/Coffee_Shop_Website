import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, Product } from './schemas/product.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule if it includes JwtModule and ConfigService

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AuthModule, // Use AuthModule if it already has JwtModule and ConfigService
    ConfigModule, // Ensure ConfigService is available
  ],
  controllers: [ProductsController],
  providers: [ProductsService, AdminGuard],
})
export class ProductsModule {}
