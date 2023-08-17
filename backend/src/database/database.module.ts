import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { SearchParamTableService } from './SearchParamTable.service';
import { PictureTableService } from './PictureTable.service';

@Module({
  imports: [],
  controllers: [],
  providers: [DatabaseService, SearchParamTableService, PictureTableService],
})
export class DataBaseModule {}
