import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql2';


@Module({})
export class DatabaseModule implements OnModuleInit, OnModuleDestroy {
  private connection: mysql.Connection;

  constructor() {
    this.connectToDatabase();
  }

  private connectToDatabase() {
    this.connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });

    this.connection.connect((err) => {
      if (err) {
        console.error('Erreur lors de la connexion à la base de données :', err);
        return;
      }
      console.log('Connexion à la base de données établie !');
    });
  }

  onModuleInit() {
    // La méthode onModuleInit() sera appelée lorsque le module sera initialisé
    // Vous pouvez y placer des opérations à effectuer au démarrage de l'application
  }

  onModuleDestroy() {
    // La méthode onModuleDestroy() sera appelée lorsque le module sera détruit
    // Vous pouvez y placer des opérations à effectuer lors de l'arrêt de l'application
    this.connection.end((err) => {
      if (err) {
        console.error('Erreur lors de la fermeture de la connexion :', err);
      }
      console.log('Connexion à la base de données fermée.');
    });
  }
}
