const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 email: { type: String, required: true, unique: true },
 password: { type: String, required: true },
 credits: { type: Number, default: 0 }
});

if (!mongoose.models.User) {
    module.exports = mongoose.model('User', userSchema);
} else {
    module.exports = mongoose.models.User;
}