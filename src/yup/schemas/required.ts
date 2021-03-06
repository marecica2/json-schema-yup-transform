import { JSONSchema7 } from "json-schema";
import capitalize from "lodash/capitalize";
import { isRequiredField } from "../../schema";
import Yup from "../addMethods";
import { SchemaItem } from "../types";
import { getError } from "../config";
import { joinPath } from "../utils";

/**
 * Add required schema should subschema is required
 */

export const createRequiredSchema = <T extends Yup.Schema<any>>(
  Schema: T,
  jsonSchema: JSONSchema7,
  [key, value]: SchemaItem
): T => {
  if (!isRequiredField(jsonSchema, key)) return Schema;

  const { description } = value;
  const path = joinPath(description, "required");
  const message = getError(path) || capitalize(`${key} is required`);
  return Schema.concat(Schema.required(message));
};
