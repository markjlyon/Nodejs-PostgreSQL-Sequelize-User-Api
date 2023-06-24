import { Table, Column, Model, DataType } from 'sequelize-typescript';

/**
 * User Entity
 * @date 6/24/2023
 *
 * @export
 * @class User
 * @typedef {User}
 * @extends {Model<User>}
 */
@Table
export class User extends Model<User> {
  /**
   * User id Column
   * @date 6/24/2023
   *
   * @type {number}
   */
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  /**
   * User name Column
   * @date 6/24/2023
   *
   * @type {string}
   */
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  /**
   * User email Column
   * @date 6/24/2023
   *
   * @type {string}
   */
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  /**
   * User password Column
   * @date 6/24/2023
   *
   * @type {string}
   */
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  /**
   * User createdAt Column
   * @date 6/24/2023
   *
   * @type {Date}
   */
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  createdAt: Date;

  /**
   * User updatedAt Column
   * @date 6/24/2023
   *
   * @type {Date}
   */
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt: Date;
}
