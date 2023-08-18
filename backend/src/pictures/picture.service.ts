import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import * as fs from 'fs';
import { FileValidationPipe } from './picture.validation.service';

@Injectable()
export class PictureService {
  private pool: mysql.Pool;

  constructor(private fileValidationPipe: FileValidationPipe) {
    this.initializePool();
  }

  private initializePool() {
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  }

  async getPicturebyId(userId: number, pictureId: number) {
    const queryFirstStep = `
      SELECT *
      FROM Picture
      WHERE userId = ?
      AND id = ?
    `;
    try {
      const [row] = await this.pool.query<mysql.RowDataPacket[]>(
        queryFirstStep,
        [userId, pictureId],
      );
      if (row && row[0] && row[0].url) {
        return row[0].url;
      } else throw new NotFoundException('Fichier introuvable');
    } catch (err) {
      throw new ForbiddenException('Connexion Refusée');
    }
  }

  // Check les fichiers, les upload sur le serveur si tout va bien, et push leur chemin dans la DB
  async uploadFiles(files: Array<Express.Multer.File>, userId: number) {
    console.log('debut service');
    if ((await this.checkNumberOfPicture(userId)) + files.length > 5)
      throw new ForbiddenException(
        "Tu as deja 5 photos de profil, impossible d'en ajouter plus",
      );
    console.log('check nb photo done');
    files.forEach((file) => {
      // Appliquer FileValidationPipe à chaque élément du tableau
      this.fileValidationPipe.transform(file, null);
    });
    console.log('check pipe done');
    const uploadPath = '/app/pictures/uploaded_files'; // Répertoire de stockage
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    const savedFilePaths = []; // Pour stocker les chemins des fichiers enregistrés
    files.forEach((file) => {
      const fileName = file.originalname;
      const filePath = uploadPath + '/' + fileName;
      // Enregistrement du fichier sur le serveur
      fs.writeFileSync(filePath, file.buffer);
      savedFilePaths.push(filePath); // Stocker le chemin du fichier enregistré
    });
    const insertPromises = savedFilePaths.map(async (filePath, index) => {
      const query =
        'INSERT INTO Picture (userId, url, isProfilePicture, timestamp) VALUES (?, ?, ?, ?)';
      const isProfile = index === 0; // Pour definir la 1er photo comme photo de profil
      const timestamp = new Date();
      const connection = await this.pool.getConnection();
      await connection.query(query, [userId, filePath, isProfile, timestamp]);
      connection.release();
    });
    await Promise.all(insertPromises);
  }

  // Set a false l'ancienne photo de profil et set a true la nouvelle
  async defineProfilePicture(userId: number, pictureId: number) {
    // etape 1
    const queryFirstStep = `
    UPDATE Picture
    SET isProfilePicture = ?
    WHERE userId = ?
    AND isProfilePicture = ?
  `;
    try {
      await this.pool.query<mysql.RowDataPacket[]>(queryFirstStep, [
        false,
        userId,
        true,
      ]);
    } catch (err) {
      throw new ForbiddenException('Connexion Refusée');
    }
    // etape 2
    const query2ndStep = `
    UPDATE Picture
    SET isProfilePicture = ?
    WHERE id = ?
  `;
    try {
      await this.pool.query<mysql.RowDataPacket[]>(query2ndStep, [
        true,
        pictureId,
      ]);
    } catch (err) {
      throw new ForbiddenException('Connexion Refusée');
    }
  }

  async checkNumberOfPicture(userId: number) {
    const query = `
    SELECT *
    FROM Picture
    WHERE userId = ?
  `;
    try {
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(query, [
        userId,
      ]);
      return rows.length;
    } catch (err) {
      console.error(
        'Erreur lors de la recherche du user par ID: ',
        userId,
        err,
      );
      throw new ForbiddenException('Connexion Refusée');
    }
  }

  async deletePicture(pictureId: number) {}
}
