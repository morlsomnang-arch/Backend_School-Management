import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

export const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name_kh: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  name_en: {
    type: DataTypes.STRING(150),
  },
  dob: {
    type: DataTypes.DATEONLY,
  },
  gender: {
    type: DataTypes.ENUM("M", "F", "O"),
  },
  phone: {
    type: DataTypes.STRING(30),
  },
  image: {
    type: DataTypes.STRING(255),
  },
}, {
  tableName: "students",
  timestamps: false,
});
