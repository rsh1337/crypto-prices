import mongoose from 'mongoose';

global.models = global.models || {};

global.models.Users =
  global.models.Users ||
  mongoose.model('Users', {
    email: { type: String },
    password: { type: String },
  });

export default global.models.Users