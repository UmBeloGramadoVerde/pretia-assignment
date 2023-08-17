import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, MongoRepository, ObjectId as ObjectIDType, Repository } from "typeorm";
import { ObjectId } from 'mongodb';

import { Article } from "../entities/article.entity";

@Injectable()
export class ArticleRepository extends MongoRepository<Article> {
  constructor(private dataSource: DataSource) {
    super(Article, dataSource.createEntityManager());
  }

  async getById(id: string): Promise<Article> {
    console.debug('id', id)
    const normalizedId = typeof id === "string" ? new ObjectId(id) : id;
    const article = await this.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }
}
