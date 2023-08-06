import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { SearchParamTableService } from './SearchParamTable.service';
import { PictureTableService } from './PictureTable.service';
import { InteractionTableService } from './InteractionTable.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    DatabaseService,
    SearchParamTableService,
    PictureTableService,
    InteractionTableService,
  ],
})
export class DataBaseModule {}