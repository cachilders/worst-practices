const mongoose = require('mongoose')

const missiveSchema = new mongoose.Schema({
  share: String,
  likes: {type: Number, default: 0}
},
  { timestamps: { createdAt: 'created_at' } }
)

const Missive = module.exports = mongoose.model('Missive', missiveSchema);