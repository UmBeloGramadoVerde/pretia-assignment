import { Injectable } from "@nestjs/common";
import { File } from "../entities/file.entity";
import { FileRepository } from "../repositories/file.repository";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class FileService {
  constructor(private repository: FileRepository) {}

  async saveFileMetadata(file: Express.Multer.File): Promise<File> {
    const newFile = this.repository.create({
      filename: file.originalname,
      path: file.path, // This could be a local path or a URL if using cloud storage
      size: file.size,
      contentType: file.mimetype,
    });

    return this.repository.save(newFile);
  }
  async removeFile(file: File): Promise<File> {
    const absPath = path.join(__dirname, "../../../../", file.path);
    fs.unlinkSync(absPath);
    return this.repository.remove(file);
  }
}
