import mongoose, { Document, Schema } from "mongoose";

export interface ICoin extends Document {
  name: string;
  code: string;
  exchange?: number;
  activeYn?: string;
}

const coinSchema: Schema = new Schema<ICoin>(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    exchange: { type: Number, required: true, default: 0 },
    activeYn: { type: String, required: true, default: "N" },
  },
  { timestamps: true },
);

const Coin = mongoose.model<ICoin>("Coin", coinSchema, "coins");

export default Coin;
