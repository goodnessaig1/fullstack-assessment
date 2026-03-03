import { UploadedFileType } from "../types/upload.type";
import path from "path";
import cloudinary from "../config/cloudinary.config";
import { UploadApiResponse } from "cloudinary";

class UploadService {
  async uploadFile(
    buffer: Buffer,
    fileName: string,
    mimetype: string,
  ): Promise<UploadedFileType & { fileSize: number }> {
    const provider = process.env.UPLOAD_PROVIDER || "aws";

    return await this.uploadToCloudinary(buffer, fileName, mimetype);
  }

  private async uploadToCloudinary(
    buffer: Buffer,
    fileName: string,
    mimetype: string,
  ): Promise<UploadedFileType & { fileSize: number }> {
    return new Promise((resolve, reject) => {
      const resourceType = mimetype.startsWith("image/")
        ? "image"
        : mimetype.startsWith("video/")
          ? "video"
          : "raw";

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          public_id: path.parse(fileName).name,
          folder: "uploads",
        },
        (error, result: UploadApiResponse | undefined) => {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return reject(new Error("Cloudinary upload failed"));
          }
          resolve({
            url: result.secure_url,
            key: result.public_id,
            bucket: "cloudinary",
            contentType: mimetype,
            fileSize: result.bytes,
          });
        },
      );
      uploadStream.end(buffer);
    });
  }
}

export default new UploadService();
