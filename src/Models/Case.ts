// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// @Entity()
// export class CaseModel {
//   @PrimaryGeneratedColumn()
//   id: string; /* Guild ID */
//   @Column()
//   case: string; /* Case Number */
//   @Column()
//   reason: string; /* Case Reason */
//   @Column()
//   user: string;
//   @Column()
//   staff: string;
//   @Column()
//   locked: boolean;
// };
import * as mongoose from 'mongoose';
const CaseModel = mongoose.model('Case', new mongoose.Schema({
  _id: String,
  type: String,
  case: String,
  reason: String,
  user: String,
  staff: String,
  locked: Boolean,
  timestamp: Number
}, {
  strict: true
}));
export default CaseModel;