import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "city" })
export class City {
  /**
   * Internal database id
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * City name
   * @example "Paris"
   */
  @Column({ type: "varchar", length: 255 })
  name: string;

  /**
   * City postal code
   * @example 75000
   */
  @Column({ type: "varchar", length: 5 })
  postalCode: string;

  /**
   * French city code
   * @example 10002
   */
  @Column({ type: "varchar", length: 5, unique: true })
  cityCode: string;
}