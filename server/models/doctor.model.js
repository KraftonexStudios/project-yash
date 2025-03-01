import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

// Define Doctor Schema
const DoctorSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    profileImage: { type: String },
    
    // Professional Details
    specialization: { 
      type: String, 
      required: true,
      enum: [
        "General Physician",
        "Cardiologist",
        "Dermatologist",
        "Pediatrician",
        "Orthopedic",
        "Neurologist",
        "Psychiatrist",
        "Gynecologist",
        "ENT Specialist",
        "Ophthalmologist",
        "Dentist",
        "Urologist",
        "Endocrinologist",
        "Pulmonologist",
        "Oncologist"
      ]
    },
    qualification: [{ 
      degree: String,
      institute: String,
      year: Number
    }],
    experience: { type: Number, required: true }, // in years
    registrationNumber: { type: String, required: true, unique: true },
    
    // Practice Details
    clinicAddress: {
      name: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    
    // Consultation Details
    consultationFees: { type: Number, required: true },
    availableSlots: [{
      day: { 
        type: String, 
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      },
      startTime: String,
      endTime: String,
      isAvailable: { type: Boolean, default: true }
    }],
    
    // Reviews and Ratings
    reviews: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      review: String,
      date: { type: Date, default: Date.now }
    }],
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    
    // Specialties and Expertise
    expertise: [String],
    languages: [String],
    
    // Additional Information
    about: { type: String, required: true },
    awards: [String],
    publications: [{
      title: String,
      journal: String,
      year: Number,
      link: String
    }],
    
    isVerified: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    isOnline: { type: Boolean, default: false },
    lastActive: { type: Date, default: Date.now },
    
    // System Fields
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Calculate average rating when a new review is added
DoctorSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
    return;
  }
  
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.averageRating = totalRating / this.reviews.length;
  this.totalReviews = this.reviews.length;
};

// Update timestamps before saving
DoctorSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

// Generate Auth Token for Doctor
DoctorSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, role: "doctor" }, process.env.SECRET_TOKEN, {
    expiresIn: "24h",
  });
};

// Compare Password for Login
DoctorSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
DoctorSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// DoctorSchema.index({ location: "2dsphere" });

export default mongoose.model("Doctor", DoctorSchema);

// Middleware to hash password before saving
// DoctorSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });
