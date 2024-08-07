import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: ['professional', 'owner', 'buyer', 'agent'], required: true },
    address: { type: String, optional: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    companyName: { type: String, required: function() { return this.role === 'professional'; } },
    companyAddress: { type: String, optional: function() { return this.role === 'professional'; } },
    purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }],
    subscriptionPlan: { type: String, optional: true },
    propertiesListed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
    feedbackReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }],
    numberOfVisits: { type: Number, default: 0 },
    interestedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
    scheduledVisits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Visit' }],
    notifications: [{ type: String }],
    assignedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
    ratings: [{ type: Number }],
    totalVisitsConducted: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 }
});



const User = mongoose.model('User', userSchema);

export{User}