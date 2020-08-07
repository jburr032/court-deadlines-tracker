/**
 * The case model will also serve as an event model to receive extracted JSON events
 * from the OCR service. The JSON will comprise
 * "date":"Date string",
 * "deadline": "string"
 *
 * The "deadline" will be the narrative from the extracted court order
 */

import mongoose from "mongoose";
import { REPL_MODE_STRICT } from "repl";

interface CaseAttrs {
  // Will be a date string
  createdAt: string;
  updatedAt: string;
  // string array to hold user email and userId
  updatedBy: string;
  caseNo: string;
  parties: string[];
  caseDeadlines: object[];
  owner: string;
  addedUsers?: string[];
}

interface CaseDoc extends mongoose.Document {
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  caseNo: string;
  parties: string[];
  caseDeadlines: object[];
  owner: string;
  addedUsers?: string[];
}

interface CaseModel extends mongoose.Model<CaseDoc> {
  build(attrs: CaseAttrs): CaseDoc;
}

const caseSchema = new mongoose.Schema(
  {
    createdAt: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: Array,
      required: true,
    },
    caseNo: {
      type: String,
      required: true,
    },
    parties: {
      type: Array,
      required: true,
    },
    caseDeadlines: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    addedUsers: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

caseSchema.statics.build = (attrs: CaseAttrs) => {
  return new CaseEntry(attrs);
};

const CaseEntry = mongoose.model<CaseDoc, CaseModel>("Case", caseSchema);

export { CaseEntry };
