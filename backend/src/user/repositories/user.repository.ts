import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, MongoRepository, ObjectId as ObjectIDType, Repository } from "typeorm";
import { ObjectId } from "mongodb";

import { User } from "../entities/user.entity";

@Injectable()
export class UserRepository extends MongoRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getById(id: string): Promise<User> {
    console.debug("id", id);
    console.debug("new ObjectId(id)", new ObjectId(id));
    console.debug("new ObjectId(id).toString()", new ObjectId(id).toString());
    const normalizedId = typeof id === "string" ? new ObjectId(id) : id;
    const user = await this.findOneBy({ _id: new ObjectId(id) });
    console.debug("user REPO", user);
    if (!user) {
      throw new NotFoundException();
    }

    return { ...user, id: new ObjectId(user._id).toString() };
  }
}
