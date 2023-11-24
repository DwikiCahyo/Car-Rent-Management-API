import { Model, ModelObject } from "objection";
import { UserModel } from "./users";

export class RolesModel extends Model {
  id!: number;
  name!: string;

  static get tableName() {
    return "roles";
  }

  static relationMappings = {
    users: {
      relation: Model.HasManyRelation,
      modelClass: UserModel,
      join: {
        from: "roles.id",
        to: "users.role_id ",
      },
    },
  };
}

export type Roles = ModelObject<RolesModel>;
