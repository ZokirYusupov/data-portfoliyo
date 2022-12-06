const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 15
  },
  last_name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 15
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  image: {
    type: String,
    // required: true
  },
  password: {
    type: String,
    required: true
  },
  group_number: {
    type: String,
    trim: true,
    default: '0'
  },
  category: {
    type: String,
    required: true
  },
  projects: [{
    type: Schema.Types.ObjectId, 
    ref: 'Project'
  }],
  isAdmin: {
    type: Boolean,
    default: false
  }

},
{
  timestamps: true,
})


module.exports = model('User', userSchema)