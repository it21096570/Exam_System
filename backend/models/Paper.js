module.exports = (sequelize, DataTypes) => {
    const Paper = sequelize.define("Paper", {

        paperId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        subject: {
            type: DataTypes.STRING(45),
            defaultValue: null,
        },
        teacherId: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            
        },
        alloctedMarks: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        duration: {
            type: DataTypes.STRING(45),
            defaultValue: null,
        },
        status: {
            type: DataTypes.ENUM('Draft', 'Published'),
            defaultValue: "Draft",
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: null,
        },

    });

    Paper.associate = (models) => {
        Paper.hasMany(models.StdPaper, {
            foreignKey:"paperId",
            sourceKey: "paperId",
        });
    };

    Paper.associate = (models) => {
        Paper.belongsTo(models.Teacher, {
            foreignKey:"teacherId",
            targetKey: "teacherId",
        });

        Paper.hasMany(models.Questions, {
            foreignKey:"paperId",
            sourceKey: "paperId",
        });
    };

   

    return Paper;
};