const { Schema, model } = require('mongoose')

const projectSchema = new Schema({
    project_name: {
      type: String,
      required: true,
      maxLength: 40
    },
    description: {
      type: String,
      required:true
    },
    image: {
      type: String,
      required:true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    git_link: String,
    demo_link: String,
    isActive: {
      type: Boolean,
      required: true,
      default: true
    },
    visits: {
      type: Number,
      default: 1
    },
    comments: [
      {author: String, comment: String}
    ],
    likes: [ ]
})

module.exports = model("Project", projectSchema)