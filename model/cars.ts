import { Model, ModelObject } from "objection";
import { UserModel, Users } from "./users";

export class CarsModel extends Model {
  id!: string;
  plate!: string;
  manufacture!: string;
  image!: string;
  model!: string;
  type!: string;
  description!: string;
  transmission!: string;
  capacity!: number;
  rentPerDay!: number;
  availableAt!: Date;
  available!: boolean;
  year!: number;
  options!: string;
  specs!: string;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  created?: Users;
  deleted?: Users;
  updated?: Users;

  static get tableName() {
    return "cars";
  }

  static relationMappings = {
    created: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: "cars.created_by",
        to: "users.id",
      },
    },
    updated: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: "cars.updated_by",
        to: "users.id",
      },
    },
    deleted: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: "cars.deleted_by",
        to: "users.id",
      },
    },
  };
}

export type Cars = ModelObject<CarsModel>;
