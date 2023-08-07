module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define("Questions", {

    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    paperId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    question: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

  });

  Questions.associate = (models) => {
    Questions.belongsTo(models.Paper, {
      foreignKey: "paperId",
      targetKey: "paperId",
    });

    Questions.hasMany(models.Answers, {
      foreignKey: "questionId",
      sourceKey: "questionId",
    });

    Questions.hasMany(models.StudentAnswer, {
      foreignKey: "questionId",
      sourceKey: "questionId",
    });
  };



  return Questions;
};