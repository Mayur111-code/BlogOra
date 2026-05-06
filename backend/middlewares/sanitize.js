const TEST = /^\$|\./;

const sanitize = (value) => {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) value[i] = sanitize(value[i]);
    return value;
  }
  if (value && typeof value === "object") {
    for (const key of Object.keys(value)) {
      if (TEST.test(key)) {
        delete value[key];
      } else {
        value[key] = sanitize(value[key]);
      }
    }
  }
  return value;
};

export const sanitizeMongo = (req, _res, next) => {
  if (req.body) sanitize(req.body);
  if (req.params) sanitize(req.params);
  next();
};

export default sanitizeMongo;
