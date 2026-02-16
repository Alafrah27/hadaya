import crypto from "crypto";
const generateSlug = () => {
  return crypto.randomBytes(16).toString("hex");
};

export default generateSlug;
