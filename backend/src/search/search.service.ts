import { ForbiddenException, Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { SearchValidation } from './search.validation.service';
import axios from 'axios';


@Injectable()
export class SearchService {
  private pool: mysql.Pool;

  constructor(private validation: SearchValidation) {
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

  // CREATE TABLE IF NOT EXISTS SearchParam (
  //     id           INT PRIMARY KEY AUTO_INCREMENT,
  //     userId       INT UNIQUE,
  //     position     VARCHAR(255),
  //     distanceMax  INT,
  //     gender       JSON,
  //     ageMin       INT,
  //     ageMax       INT
  // );

  async updateMinAge(userId: number, minAge: number) {
    if (this.validation.age(minAge) > 0)
      throw new ForbiddenException('Age invalide');
    const updateDataQuery = `
      UPDATE SearchParam
      SET ageMin = ?
      WHERE userId = ?
      `;

    try {
      await this.pool.query(updateDataQuery, [minAge, userId]);
    } catch (err) {
      console.error(
        "Erreur lors de la modification de l'age mini: ",
        minAge,
        err,
      );
      throw new ForbiddenException('Utilisateur introuvable');
    }
  }

  async updateMaxAge(userId: number, maxAge: number) {
    if (this.validation.age(maxAge) > 0)
      throw new ForbiddenException('Age invalide');
    const updateDataQuery = `
      UPDATE SearchParam
      SET ageMax = ?
      WHERE userId = ?
      `;

    try {
      await this.pool.query(updateDataQuery, [maxAge, userId]);
    } catch (err) {
      console.error(
        "Erreur lors de la modification de l'age mini: ",
        maxAge,
        err,
      );
      throw new ForbiddenException('Utilisateur introuvable');
    }
  }

  async updateDistanceMax(userId: number, distance: number) {
    if (this.validation.distance(distance) > 0)
      throw new ForbiddenException('Age invalide');
    const updateDataQuery = `
      UPDATE SearchParam
      SET distanceMax = ?
      WHERE userId = ?
      `;

    try {
      await this.pool.query(updateDataQuery, [distance, userId]);
    } catch (err) {
      console.error(
        "Erreur lors de la modification de l'age mini: ",
        distance,
        err,
      );
      throw new ForbiddenException('Utilisateur introuvable');
    }
  }

  // Convertir une adresse ip en ville d'origine, puis cette ville en coordonées gps
  async getLocationByIp(userId: number, userIp: string) {
    const geoip = require('geoip-lite');
    if (!geoip) return null;
    const location = geoip.lookup(userIp)
    if (!location) return null;
    const resultGPS = await this.cityToCoordinates(location.city);
    if (!resultGPS) return null;
    const position = { longitude: resultGPS.longitude, latitude: resultGPS.latitude };
    const updateDataQuery = `
      UPDATE SearchParam
      SET position = ?
      WHERE userId = ?
      `;

    try {
      await this.pool.query(updateDataQuery, [JSON.stringify(position), userId]);
    } catch (err) {
      console.error(
        'Erreur lors de la modification de la position: ',
        location,
        err,
      );
      throw new ForbiddenException('Utilisateur introuvable');
    }
  }


async cityToCoordinates(city: string): Promise<{ latitude: number; longitude: number } | null> {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: city,
        format: 'json',
        limit: 1, // Limite la recherche à un résultat
      },
    });

    if (response.data && response.data[0]) {
      const result = response.data[0];
      console.log("RESULT ========== " , result)
      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
      };
    }

    return null; // Aucun résultat trouvé
  } catch (error) {
    throw new ForbiddenException('Erreur lors de la conversion de la ville en coordonnées GPS.');
  }
}

}
