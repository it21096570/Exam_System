module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("Student", {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(45),
            defaultValue: null,
        },
        nic: {
            type: DataTypes.STRING(20),
            defaultValue: null,
        },

    });

    Student.associate = (models) => {
        Student.belongsTo(models.User, {
            foreignKey: "nic",
            targetKey: "nic",
        });

        Student.hasMany(models.StdPaper, {
            foreignKey: "studentId",
            sourceKey: "id",
        });
    };




    return Student;
};