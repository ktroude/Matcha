import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { SearchParamTableService } from './SearchParamTable.service';
import { PictureTableService } from './PictureTable.service';
import { InterestTableService } from './InterestTable.service';
import { InteractionTableService } from './InteractionTable.service';
import { UserTableService } from './UserTable.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    DatabaseService,
    SearchParamTableService,
    PictureTableService,
    InterestTableService,
    InteractionTableService,
    UserTableService,
  ],
})
export class DataBaseModule {}