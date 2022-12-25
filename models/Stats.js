const { mongoose } = require('mongoose');

const statsSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    guild_id : { type: String, require: true },
    snowballs: { type: Number, default: 0 },
    hits: { type: Number, default: 0 },
    misses: { type: Number, default: 0 },
    kos: { type: Number, default: 0 }
});

module.exports = mongoose.model("Stats", statsSchema);