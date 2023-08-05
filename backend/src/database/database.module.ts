import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { SearchParamTableService } from './SearchParamTable.service';
import { PictureTableService } from './PictureTable.service';
import { InterestTableService } from './InterestTable.service';
import { InteractionTableService } from './InteractionTable.service';
import { ValidationModule } from 'src/validation/validation.module';
import { ValidationService } from 'src/validation/validation.service';

@Module({
  imports: [ValidationModule],
  controllers: [],
  providers: [
    DatabaseService,
    SearchParamTableService,
    PictureTableService,
    InterestTableService,
    InteractionTableService,
    ValidationService,
  ],
})
export class DataBaseModule {}