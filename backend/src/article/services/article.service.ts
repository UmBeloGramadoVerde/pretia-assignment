import { Injectable, UnauthorizedException } from "@nestjs/common";
import { plainToClass } from "class-transformer";

import { Action } from "../../shared/acl/action.constant";
import { Actor } from "../../shared/acl/actor.constant";
import { AppLogger } from "../../shared/logger/logger.service";
import { RequestContext } from "../../shared/request-context/request-context.dto";
import { User } from "../../user/entities/user.entity";
import { UserService } from "../../user/services/user.service";
import {
  CreateArticleInput,
  UpdateArticleInput,
} from "../dtos/article-input.dto";
import { ArticleOutput } from "../dtos/article-output.dto";
import { Article } from "../entities/article.entity";
import { ArticleRepository } from "../repositories/article.repository";
import { ArticleAclService } from "./article-acl.service";
import { Express } from "express";
import { FileService } from "./file.service";
import { File } from "../entities/file.entity";

@Injectable()
export class ArticleService {
  constructor(
    private repository: ArticleRepository,
    private userService: UserService,
    private aclService: ArticleAclService,
    private fileService: FileService,
    private readonly logger: AppLogger
  ) {
    this.logger.setContext(ArticleService.name);
  }

  async createArticle(
    ctx: RequestContext,
    input: CreateArticleInput,
    image?: Express.Multer.File
  ): Promise<ArticleOutput> {
    console.debug("input", input);
    console.debug("image", image);
    this.logger.log(ctx, `${this.createArticle.name} was called`);

    const article = plainToClass(Article, input);
    console.debug("article", article);

    const actor: Actor = ctx.user;
    console.debug("actor", actor);

    const user = await this.userService.findById(ctx, actor.id);
    console.debug("user", user);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, article);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    article.author = plainToClass(User, user);
    if (image) {
      const savedFile = await this.fileService.saveFileMetadata(image);
      article.imageContent = plainToClass(File, savedFile);
      console.debug("savedFile", savedFile);
    }

    this.logger.log(ctx, `calling ${ArticleRepository.name}.save`);
    console.debug("article", article);
    const savedArticle = await this.repository.save(article);

    return plainToClass(ArticleOutput, savedArticle, {
      excludeExtraneousValues: true,
    });
  }

  async getArticles(
    ctx: RequestContext,
    limit: number,
    offset: number
  ): Promise<{ articles: ArticleOutput[]; count: number }> {
    this.logger.log(ctx, `${this.getArticles.name} was called`);

    this.logger.log(ctx, `calling ${ArticleRepository.name}.findAndCount`);
    const [articles, count] = await this.repository.findAndCount({
      where: {},
      take: limit,
      skip: offset,
    });

    console.debug("articles", articles);
    const articlesOutput = plainToClass(ArticleOutput, articles, {
      excludeExtraneousValues: true,
    });
    console.debug("articles", articlesOutput);

    return { articles: articlesOutput, count };
  }

  async getArticleById(
    ctx: RequestContext,
    id: number
  ): Promise<ArticleOutput> {
    this.logger.log(ctx, `${this.getArticleById.name} was called`);

    this.logger.log(ctx, `calling ${ArticleRepository.name}.getById`);
    const article = await this.repository.getById(id);

    return plainToClass(ArticleOutput, article, {
      excludeExtraneousValues: true,
    });
  }

  async updateArticle(
    ctx: RequestContext,
    articleId: number,
    input: UpdateArticleInput,
    image?: Express.Multer.File
  ): Promise<ArticleOutput> {
    console.debug("image", image);
    this.logger.log(ctx, `${this.updateArticle.name} was called`);

    this.logger.log(ctx, `calling ${ArticleRepository.name}.getById`);
    const article = await this.repository.getById(articleId);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, article);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    const previousImageContent = article.imageContent;

    if (image) {
      const savedFile = await this.fileService.saveFileMetadata(image);
      article.imageContent = plainToClass(File, savedFile);
      console.debug("savedFile", savedFile);
    }

    const updatedArticle: Article = {
      ...article,
      ...plainToClass(Article, input),
    };

    this.logger.log(ctx, `calling ${ArticleRepository.name}.save`);
    const savedArticle = await this.repository.save(updatedArticle);

    if (image) {
      if (previousImageContent && previousImageContent.id) {
        this.fileService.removeFile(plainToClass(File, previousImageContent));
      }
    }

    return plainToClass(ArticleOutput, savedArticle, {
      excludeExtraneousValues: true,
    });
  }

  async deleteArticle(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteArticle.name} was called`);

    this.logger.log(ctx, `calling ${ArticleRepository.name}.getById`);
    const article = await this.repository.getById(id);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, article);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${ArticleRepository.name}.remove`);
    await this.repository.remove(article);
  }
}
