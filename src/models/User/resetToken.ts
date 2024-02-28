// models/resetToken.ts
import { model, Schema, Document } from 'mongoose';

interface IResetToken extends Document {
  userId: Schema.Types.ObjectId;
  token: string;
  expiresAt: Date;
}

const resetTokenSchema = new Schema<IResetToken>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const ResetToken = model<IResetToken>('ResetToken', resetTokenSchema);

export default ResetToken;
