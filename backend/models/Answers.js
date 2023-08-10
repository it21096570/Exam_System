module.exports = (sequelize, DataTypes) => {
    const Answers = sequelize.define("Answers", {

        answerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        answer: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        mark: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        status: {
            type: DataTypes.ENUM('Correct', 'Wrong'),
            defaultValue: null,
        },

    });

    Answers.associate = (models) => {
        Answers.belongsTo(models.Questions, {
            foreignKey:"questionId",
            targetKey: "questionId",
        });

        Answers.hasMany(models.StudentAnswer, {
            foreignKey:"answerId",
            sourceKey: "answerId",
        });
    };


    return Answers;
};