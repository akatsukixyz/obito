import * as mongoose from 'mongoose';
const ConfigModel = mongoose.model('Config', new mongoose.Schema({
  _id: String,
  log: String
}));
export default ConfigModel;