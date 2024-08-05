import { Injectable } from '@nestjs/common';
import { CreateCarImageDto } from '../common/dto/create-car-image.dto';

@Injectable()
export class CarImageService {
  async createImage(file: Express.Multer.File) {
    const fileExtension = path.extname(file.originalname);
    const filename = `${fileId}${fileExtension}`;
    const filepath = path.join(__dirname, '../../uploads', filename);

    fs.writeFileSync(filepath, file.buffer);

    const newImage = await this.prisma.carImage.create({
      data: {
        id: fileId,
        url: `/uploads/${filename}`,
        mimetype: file.mimetype,
      },
    });

    return newImage;
  }

  
  async deleteImage(id: string) {
    return 
  }
}
