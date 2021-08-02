import "express-async-errors";
import Joi from "joi";
import Util from "../utils/Utils";

const util = new Util();

const paramSchema = Joi.object({
  id: Joi.number().required(),
}).options({ allowUnknown: false });

const bodySchema = Joi.object({
  description: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
}).options({ allowUnknown: false });

function validateBody(type, req, res, next) {
  const { error, value } = bodySchema.tailor(type).validate(req.body);
  if (error) {
    util.setError(400, error.message);
    util.send(res);
    return;
  }

  req.body = value;
  next();
}

function validateParams(req, res, next) {
  const { error } = paramSchema.validate(req.params);

  if (error) {
    util.setError(400, error.message);
    util.send(res);
    return;
  }

  next();
}

function addPost(req, res, next) {
  validateBody("create", req, res, next);
}

function editPost(req, res, next) {
  var { error } = paramSchema.validate(req.params);

  if (error) {
    util.setError(400, error.message);
    util.send(res);
    return;
  }

  var { error } = bodySchema.tailor("update").validate(req.body);

  if (error) {
    util.setError(400, error.message);
    util.send(res);
    return;
  }

  next();
}

function addRating(req, res, next) {
  const ratingSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
  }).options({ allowUnknown: false });
  var { error, value } = ratingSchema.validate(req.body);

  if (error) {
    util.setError(400, error.message);
    util.send(res);
    return;
  }

  var { error }  = paramSchema.validate(req.params);

  if (error) {
    util.setError(400, error.message);
    util.send(res);
    return;
  }

  req.body = value;

  next();
}

export default {
  addPost,
  addRating,
  editPost,
  validateParams,
};
