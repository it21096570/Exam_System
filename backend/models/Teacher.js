
module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define("Teacher", {

        teacherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        teacherName: {
            type: DataTypes.STRING(45),
            defaultValue: null,
        },
        nic: {
            type: DataTypes.INTEGER,
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