module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {

        nic: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(45),
            defaultValue: null,
        },
        role: {
            type: DataTypes.STRING(45),
            defaultValue: null,
        },
        username: {
            type: DataTypes.STRING(45),
            defaultValue: null,
        },
        password: {
            type: DataTypes.STRING(200),
            defaultValue: null,
        },

    });

  

    User.associate = (models) => {
        User.hasOne(models.Student, {
            foreignKey:"nic",
            sourceKey: "nic",
        });

        User.hasOne(models.Teacher, {
            foreignKey:"nic",
            sourceKey: "nic",
        });
    };


    return User;
};