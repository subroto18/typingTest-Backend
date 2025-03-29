const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async (next) => {
  let user = this;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    const isPasswordMatch = await bcrypt.compare(userPassword, this.password);
    return isPasswordMatch;
  } catch (error) {
    throw error;
  }
};

// Add a transform to remove sensitive fields
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password; // Exclude password
    return ret;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
