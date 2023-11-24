import { Model, ModelObject } from "objection";
import { RolesModel, Roles } from "./roles";
import { CarsModel } from "./cars";

export class UserModel extends Model {
  id!: number;
  email!: string;
  password!: string;
  role_id!: number;
  roles?: Roles;

  static get tableName() {
    return "users";
  }
  static relationMappings = {
    roles: {
      relation: Model.BelongsToOneRelation,
      modelClass: RolesModel,
      join: {
        from: "users.role_id",
        to: "roles.id",
      },
    },

    created_cars: {
      relation: Model.HasManyRelation,
      modelClass: CarsModel,
      join: {
        from: "users.id",
        to: "cars.created_by",
      },
    },
    updated_cars: {
      relation: Model.HasManyRelation,
      modelClass: CarsModel,
      join: {
        from: "users.id",
        to: "cars.updated_by",
      },
    },
    deleted_cars: {
      relation: Model.HasManyRelation,
      modelClass: CarsModel,
      join: {
        from: "users.id",
        to: "cars.deleted_by",
      },
    },
  };
}

export type Users = ModelObject<UserModel>;
