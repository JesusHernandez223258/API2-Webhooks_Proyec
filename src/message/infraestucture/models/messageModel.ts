import { Column, DataType, Model, Table } from "sequelize-typescript";// Ajusta la ruta según la ubicación de tu clase Message

@Table({
  tableName: "messages",
  timestamps: true,
})
class MessageModel extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public content!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public timestamp!: Date;
}

export default MessageModel;