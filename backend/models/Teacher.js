
module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define("Teacher", {

        teacherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        teacherName: {
            type: DataTypes.STRING(45),
            defaultValue: null,
        },
        nic: {
            type: DataTypes.STRING(20),
            defaultValue: null,
        },

    });

    Teacher.associate = (models) => {
        Teacher.belongsTo(models.User, {
            foreignKey: "nic",
            targetKey: "nic",
        });

        Teacher.hasMany(models.Paper, {
            foreignKey: "teacherId",
            sourceKey: "teacherId",
        });
    };



    return Teacher;
};