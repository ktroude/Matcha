import { ForbiddenException, Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { SearchValidation } from './search.validation.service';
import axios from 'axios';
import * as math from 'mathjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SearchService {
  private pool: mysql.Pool;

  constructor(
    private validation: SearchValidation,
    private userService: UserService
    ) {
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

  // Convertir une adresse ip en ville d'origine, puis cette ville en coordonées gps et push l'info dans la DB
  async pushLocationByIp(userId: number, userIp: string) {
    const geoip = require('geoip-lite');
    if (!geoip) return null;
    const location = geoip.lookup(userIp);
    if (!location) return null;
    const resultGPS = await this.cityToCoordinates(location.city);
    if (!resultGPS) return null;
    const position = {
      longitude: resultGPS.longitude,
      latitude: resultGPS.latitude,
    };
    const updateDataQuery = `
      UPDATE SearchParam
      SET position = ?
      WHERE userId = ?
      `;

    try {
      await this.pool.query(updateDataQuery, [
        JSON.stringify(position),
        userId,
      ]);
    } catch (err) {
      console.error(
        'Erreur lors de la modification de la position: ',
        location,
        err,
      );
      throw new ForbiddenException('Utilisateur introuvable');
    }
  }

  async cityToCoordinates(
    city: string,
  ): Promise<{ latitude: number; longitude: number } | null> {
    try {
      const response = await axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
          params: {
            q: city,
            format: 'json',
            limit: 1, // Limite la recherche à un résultat
          },
        },
      );

      if (response.data && response.data[0]) {
        const result = response.data[0];
        console.log('RESULT ========== ', result);
        return {
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.lon),
        };
      }

      return null; // Aucun résultat trouvé
    } catch (error) {
      throw new ForbiddenException(
        'Erreur lors de la conversion de la ville en coordonnées GPS.',
      );
    }
  }

  // Recupere les coordonées GPS de deux utilisateurs et retourne la distance qui les sépare
  async getDistance(user1: number, user2: number) {
    // On passe les id ou le sub en parametre
    const query = `
    SELECT *
    FROM SearchParam
    WHERE userId = ? OR userId = ?
    LIMIT 2
  `;

    try {
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(query, [
        user1,
        user2,
      ]);
      if (rows.length != 2)
        throw new ForbiddenException('un des utilisateur est introuvable');
      const ptA = rows[0].position;
      const ptB = rows[1].position;
      return this.calculateDistance(ptA.lat, ptA.lon, ptB.lat, ptB.lon);
    } catch (e) {
      console.error(e);
      throw new ForbiddenException('un des utilisateur est introuvable');
    }
  }

  // Trouver la distance en km entre deux coordonées gps (lon et lat)
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const earthRadiusKm = 6371; // Rayon de la Terre en kilomètres

    const lat1Rad = this.toRadians(lat1);
    const lon1Rad = this.toRadians(lon1);
    const lat2Rad = this.toRadians(lat2);
    const lon2Rad = this.toRadians(lon2);

    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c; // Distance en kilomètres

    return distance;
  }

  toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  async findUserById(userId: number) {
    const query = `
    SELECT *
    FROM SearchParam
    WHERE userId = ?
  `;
    try {
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(query, [
        userId,
      ]);
      console.log(rows[0]);
      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error(
        'Erreur lors de la recherche du user par ID: ',
        userId,
        err,
      );
      return null;
    }
  }

  async findUsersWithinDistance(user: mysql.RowDataPacket) {
    try {
      if (!user || !user.position || !user.distanceMax)
        throw new ForbiddenException("L'utilisateur n'existe pas");
      const userPosition = user.position;
      const userMaxDist = user.distanceMax;

      // Requete pour rechercher toutes les données des autres utilisateurs
      const allUsersQuery = `
      SELECT *
      FROM User
      WHERE id != ?
    `;

      // Récupération de toutes les données des autres utilisateurs
      const [allUsersRows] = await this.pool.query<mysql.RowDataPacket[]>(
        allUsersQuery,
        [user.userId],
      );

      // Tableau pour stocker les utilisateurs à proximité
      const usersWithinDistance = [];

      // Comparaison de la distance entre l'utilisateur donné et tous les autres utilisateurs
      for (const otherUserRow of allUsersRows) {
        const otherUserPosition = otherUserRow.position;
        // Calcul de la distance entre l'utilisateur donné et l'autre utilisateur
        const distance = this.calculateDistance(
          userPosition.lat,
          userPosition.lon,
          otherUserPosition.lat,
          otherUserPosition.lon,
        );
        // Si la distance est inf ou egale à la maxDist de la cible, ajouter l'utilisateur à la liste
        if (distance <= userMaxDist) {
          usersWithinDistance.push(otherUserRow);
        }
      }
      return usersWithinDistance;
    } catch (e) {
      console.error(e);
      throw new ForbiddenException(
        'erreur lors de la recherche des utilisateurs par distance',
      );
    }
  }

  sortArrayByFame(arrayOfUser:mysql.RowDataPacket[]){
    arrayOfUser.sort((a, b) => a.fame - b.fame)
    return arrayOfUser;
  }

  // Supprime les users du tableau si ils n'ont pas le genre que l'utilisateur recherche
  findUserWithinPref(
    user: mysql.RowDataPacket,
    arrayOfUser: mysql.RowDataPacket[],
  ) {
    return arrayOfUser.filter(
      (otherUserRow) => otherUserRow.myGender in user.l4Gender,
    );
  }

  findUserWithinAge(
        user: mysql.RowDataPacket,
    arrayOfUser: mysql.RowDataPacket[],
  ) {
    for (const otherUserRow of arrayOfUser) {
      const age = this.userService.convertBirthdayInAge(otherUserRow.birthdate)
      if ( age < user.ageMin || age > user.ageMax)
            arrayOfUser.splice(arrayOfUser.indexOf(otherUserRow), 1);
    }
    return arrayOfUser;
  }


  // L'algo de trie des utilisateurs en fonction des info du user "chercheur" dans la table SearchParam
  async searchAlgorythm(userId:number) {
    try {
      const UserFromSearchParamTable = await this.findUserById(userId);
      let arrayOfUsers = await this.findUsersWithinDistance(UserFromSearchParamTable);
      const userFromUserTable = await this.userService.findUserById(userId)
      arrayOfUsers = this.findUserWithinPref(userFromUserTable, arrayOfUsers);
      arrayOfUsers = this.findUserWithinAge(UserFromSearchParamTable, arrayOfUsers);
      arrayOfUsers = this.sortArrayByFame(arrayOfUsers);
      return arrayOfUsers;
    }
    catch(e){
      console.error(e);
      return null;
    }
  }
}
