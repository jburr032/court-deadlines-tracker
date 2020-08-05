import mongoose from "mongoose";
import PasswordHasher from "../services/password-hasher";

interface UserAttrs {
  signUpEmail: string;
  // sendFromEmail is the address that will send orders via email
  sendFromEmail: string;
  username: string;
  password: string;
}

// Extends Model object to include .build() func
// The func allows us to enforce UserAttrs
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  signUpEmail: string;
  sendFromEmail: string;
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    signUpEmail: {
      type: String,
      required: true,
    },
    sendFromEmail: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        // Delete the password when transforming to JSON
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// using pre-ES6 functions for 'this' context reference
userSchema.pre("save", async function (done) {
  // isModified hook used to check it password field has been modified
  if (this.isModified("password")) {
    const hashedPassword = await PasswordHasher.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
