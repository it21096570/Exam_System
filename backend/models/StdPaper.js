module.exports = (sequelize, DataTypes) => {
    const StdPaper = sequelize.define("StdPaper", {
        studentPaperId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        paperId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        marks: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        grade: {
            type: DataTypes.STRING(1),
            defaultValue: null,
        },
        passFailStatus: {
            type: DataTypes.ENUM('Pass', 'Fail'),
            defaultValue: null,
        },
        progressStatus: {
            type: DataTypes.ENUM('Complete', 'Not Complete'),
            defaultValue: null,
        },
        status: {
            type: DataTypes.ENUM('Pending', 'Attened'),
            defaultValue: 'Pending',
        },
    });

    StdPaper.associate = (models) => {
        StdPaper.belongsTo(models.Student, {
            foreignKey: "studentId",
            targetKey: "id",
        });

        StdPaper.belongsTo(models.Paper, {
            foreignKey: "paperId",
            targetKey: "paperId",
        });

        StdPaper.hasMany(models.StudentAnswer, {
            foreignKey: "studentId",
            sourceKey: "studentId",
        });

        StdPaper.hasMany(models.StudentAnswer, {
            foreignKey: "paperId",
            sourceKey: "paperId",
        });

    };

    return StdPaper;
};
