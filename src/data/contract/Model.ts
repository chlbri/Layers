import Entity from "../../domain/contract/Entity";
import Validator from "../../domain/contract/Validator";

function toJson(entity: Entity) {
  return JSON.stringify(entity);
}

function fromJson<E extends Entity>(json: string) {
  const out = JSON.parse(json) as E;
  if (!out) return undefined;
}

function validate<E extends Entity>(
  validator: Validator<E>,
  json: {}
) {
  return validator.validate(json);
}
