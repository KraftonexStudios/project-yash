import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Award,
  CheckCircle,
  Calendar,
  DollarSign,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  specialization: string;
  experience: number;
  consultationFees: number;
  clinicAddress: {
    city: string;
    state: string;
  };
  averageRating: number;
  totalReviews: number;
  isVerified: boolean;
  expertise: string[];
  languages: string[];
  about: string;
  availableSlots: {
    day: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
  reviews: {
    userId: {
      firstName: string;
      lastName: string;
    };
    rating: number;
    review: string;
    date: string;
  }[];
}

export const specializations = [
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
  "Oncologist",
];

export const dummyDoctors: Doctor[] = [
  {
    _id: "1",
    firstName: "John",
    lastName: "Smith",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    specialization: "Cardiologist",
    experience: 15,
    consultationFees: 1500,
    clinicAddress: {
      city: "Mumbai",
      state: "Maharashtra"
    },
    averageRating: 4.8,
    totalReviews: 124,
    isVerified: true,
    expertise: ["Heart Surgery", "Cardiac Rehabilitation", "Preventive Cardiology"],
    languages: ["English", "Hindi", "Marathi"],
    about: "Dr. John Smith is a renowned cardiologist with over 15 years of experience in treating heart conditions.",
    availableSlots: [
      { day: "Monday", startTime: "09:00", endTime: "17:00", isAvailable: true },
      { day: "Wednesday", startTime: "09:00", endTime: "17:00", isAvailable: true },
      { day: "Friday", startTime: "09:00", endTime: "17:00", isAvailable: true }
    ],
    reviews: [
      {
        userId: { firstName: "Alice", lastName: "Johnson" },
        rating: 5,
        review: "Excellent doctor, very thorough and professional",
        date: "2024-02-15"
      }
    ]
  },
  {
    _id: "2",
    firstName: "Sarah",
    lastName: "Patel",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
    specialization: "Pediatrician",
    experience: 10,
    consultationFees: 1000,
    clinicAddress: {
      city: "Delhi",
      state: "Delhi"
    },
    averageRating: 4.9,
    totalReviews: 98,
    isVerified: true,
    expertise: ["Child Healthcare", "Vaccination", "Developmental Pediatrics"],
    languages: ["English", "Hindi", "Gujarati"],
    about: "Dr. Sarah Patel specializes in pediatric care with a focus on early childhood development.",
    availableSlots: [
      { day: "Tuesday", startTime: "10:00", endTime: "18:00", isAvailable: true },
      { day: "Thursday", startTime: "10:00", endTime: "18:00", isAvailable: true },
      { day: "Saturday", startTime: "09:00", endTime: "14:00", isAvailable: true }
    ],
    reviews: [
      {
        userId: { firstName: "Raj", lastName: "Kumar" },
        rating: 5,
        review: "Great with kids, very patient and caring",
        date: "2024-02-10"
      }
    ]
  },
  {
    _id: "3",
    firstName: "David",
    lastName: "Kumar",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    specialization: "Dermatologist",
    experience: 8,
    consultationFees: 1200,
    clinicAddress: {
      city: "Bangalore",
      state: "Karnataka"
    },
    averageRating: 4.7,
    totalReviews: 76,
    isVerified: true,
    expertise: ["Cosmetic Dermatology", "Skin Cancer", "Laser Treatment"],
    languages: ["English", "Hindi", "Kannada"],
    about: "Dr. David Kumar is an expert in treating various skin conditions and cosmetic procedures.",
    availableSlots: [
      { day: "Monday", startTime: "11:00", endTime: "19:00", isAvailable: true },
      { day: "Thursday", startTime: "11:00", endTime: "19:00", isAvailable: true },
      { day: "Saturday", startTime: "10:00", endTime: "15:00", isAvailable: true }
    ],
    reviews: [
      {
        userId: { firstName: "Priya", lastName: "Singh" },
        rating: 4,
        review: "Very knowledgeable and effective treatment",
        date: "2024-02-01"
      }
    ]
  },
  {
    _id: "4",
    firstName: "Priya",
    lastName: "Sharma",
    profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
    specialization: "Neurologist",
    experience: 12,
    consultationFees: 1800,
    clinicAddress: {
      city: "Chennai",
      state: "Tamil Nadu"
    },
    averageRating: 4.9,
    totalReviews: 112,
    isVerified: true,
    expertise: ["Stroke Treatment", "Epilepsy", "Movement Disorders"],
    languages: ["English", "Hindi", "Tamil"],
    about: "Dr. Priya Sharma is a leading neurologist specializing in stroke treatment and epilepsy management.",
    availableSlots: [
      { day: "Tuesday", startTime: "09:00", endTime: "17:00", isAvailable: true },
      { day: "Wednesday", startTime: "09:00", endTime: "17:00", isAvailable: true },
      { day: "Friday", startTime: "09:00", endTime: "17:00", isAvailable: true }
    ],
    reviews: [
      {
        userId: { firstName: "John", lastName: "Doe" },
        rating: 5,
        review: "Excellent diagnosis and treatment plan",
        date: "2024-01-25"
      }
    ]
  },
  {
    _id: "5",
    firstName: "Rahul",
    lastName: "Verma",
    profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
    specialization: "Orthopedic",
    experience: 14,
    consultationFees: 1600,
    clinicAddress: {
      city: "Hyderabad",
      state: "Telangana"
    },
    averageRating: 4.6,
    totalReviews: 89,
    isVerified: true,
    expertise: ["Joint Replacement", "Sports Injuries", "Spine Surgery"],
    languages: ["English", "Hindi", "Telugu"],
    about: "Dr. Rahul Verma is specialized in joint replacement surgery and sports medicine.",
    availableSlots: [
      { day: "Monday", startTime: "10:00", endTime: "18:00", isAvailable: true },
      { day: "Wednesday", startTime: "10:00", endTime: "18:00", isAvailable: true },
      { day: "Thursday", startTime: "10:00", endTime: "18:00", isAvailable: true }
    ],
    reviews: [
      {
        userId: { firstName: "Sarah", lastName: "Wilson" },
        rating: 5,
        review: "Great surgeon, explained everything clearly",
        date: "2024-02-05"
      }
    ]
  }
];

const Consultation = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [sortBy, setSortBy] = useState("rating"); // rating, experience, fees
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, [selectedSpecialization, sortBy]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      // Simulate API call with dummy data
      setTimeout(() => {
        const filteredDocs = dummyDoctors.filter(doc => 
          selectedSpecialization === 'all' || doc.specialization === selectedSpecialization
        );
        
        // Sort doctors based on selected criteria
        const sortedDocs = [...filteredDocs].sort((a, b) => {
          switch (sortBy) {
            case 'rating':
              return b.averageRating - a.averageRating;
            case 'experience':
              return b.experience - a.experience;
            case 'fees':
              return a.consultationFees - b.consultationFees;
            default:
              return 0;
          }
        });
        
        setDoctors(sortedDocs);
        setLoading(false);
      }, 500); // Add a small delay to simulate network request
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch doctors. Please try again.",
        variant: "destructive",
      });
      setDoctors([]);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchDoctors();
  };

  const handleBookAppointment = (doctorId: string) => {
    navigate(`/consultation/${doctorId}`);
  };

  const filteredDoctors = Array.isArray(doctors) ? doctors.filter((doctor) => {
    const searchString = searchTerm.toLowerCase();
    return (
      doctor.firstName.toLowerCase().includes(searchString) ||
      doctor.lastName.toLowerCase().includes(searchString) ||
      doctor.specialization.toLowerCase().includes(searchString) ||
      doctor.expertise.some((exp) => exp.toLowerCase().includes(searchString))
    );
  }) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find and Consult Doctors</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Input
              placeholder="Search doctors by name, specialization, or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <Select
          value={selectedSpecialization}
          onValueChange={setSelectedSpecialization}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specializations</SelectItem>
            {specializations.map((spec) => (
              <SelectItem key={spec} value={spec}>
                {spec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="experience">Experience</SelectItem>
            <SelectItem value="fees">Fees</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSearch}>
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Doctors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading doctors...</p>
        ) : filteredDoctors.length === 0 ? (
          <p>No doctors found matching your criteria.</p>
        ) : (
          filteredDoctors.map((doctor) => (
            <Card key={doctor._id} className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={doctor.profileImage || "/default-doctor.png"}
                  alt={`${doctor.firstName} ${doctor.lastName}`}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">
                      Dr. {doctor.firstName} {doctor.lastName}
                    </h3>
                    {doctor.isVerified && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{doctor.specialization}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm">
                      {doctor.averageRating.toFixed(1)} ({doctor.totalReviews}{" "}
                      reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Award className="h-4 w-4" />
                  <span>{doctor.experience} years experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {doctor.clinicAddress.city}, {doctor.clinicAddress.state}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  <span>Consultation Fee: ₹{doctor.consultationFees}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Languages className="h-4 w-4" />
                  <span>{doctor.languages.join(", ")}</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.expertise.map((exp, index) => (
                    <Badge key={index} variant="secondary">
                      {exp}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Available Slots</h4>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>
                    {doctor.availableSlots
                      .filter((slot) => slot.isAvailable)
                      .map((slot) => slot.day)
                      .join(", ")}
                  </span>
                </div>
              </div>

              <Button
                className="w-full mt-6"
                onClick={() => handleBookAppointment(doctor._id)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Consultation
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Consultation; 