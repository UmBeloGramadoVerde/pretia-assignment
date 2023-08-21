import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthStrategy } from '../auth/strategies/jwt-auth.strategy';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { ArticleController } from './controllers/article.controller';
import { Article } from './entities/article.entity';
import { ArticleRepository } from './repositories/article.repository';
import { ArticleService } from './services/article.service';
import { ArticleAclService } from './services/article-acl.service';
import { FileService } from './services/file.service';
import { FileRepository } from './repositories/file.repository';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Article]), UserModule],
  providers: [
    ArticleService,
    JwtAuthStrategy,
    ArticleAclService,
    FileService,
    ArticleRepository,
    FileRepository
  ],
  controllers: [ArticleController],
  exports: [ArticleService, FileService],
})
export class ArticleModule {}
