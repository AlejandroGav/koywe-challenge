import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Quote extends Document {
    @Prop()
    id: string;

    @Prop()
    from: string;

    @Prop()
    to: string;

    @Prop()
    amount: number;

    @Prop()
    rate: number;

    @Prop()
    convertedAmount: number;

    @Prop()
    timestamp: Date;

    @Prop()
    expiresAt: Date;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
