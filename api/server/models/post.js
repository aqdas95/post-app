module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    average_rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    number_of_ratings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  })
  return Post
}
