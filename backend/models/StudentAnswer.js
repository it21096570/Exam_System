module.exports = (sequelize, DataTypes) => {
    const StudentAnswer = sequelize.define("StudentAnswer", {
        studentAnswerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        paperId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        answerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        points: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        answerStatus: {
            type: DataTypes.ENUM('Correct', 'Wrong'),
            defaultValue: null,
        },
    });

    StudentAnswer.associate = (models) => {
        StudentAnswer.belongsTo(models.Questions, {
            foreignKey: "questionId",
            targetKey: "questionId",
        });

        StudentAnswer.belongsTo(models.Answers, {
            foreignKey: "answerId",
            targetKey: "answerId",
        });

        StudentAnswer.belongsTo(models.StdPaper, {
            foreignKey: "studentId",
            targetKey: "studentId",
        });

        StudentAnswer.belongsTo(models.StdPaper, {
            foreignKey: "paperId",
            targetKey: "paperId",
        });

        
    };

    return StudentAnswer;
};
