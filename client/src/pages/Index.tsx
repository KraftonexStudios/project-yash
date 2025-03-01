import { useState } from "react";
import {
  Activity,
  Stethoscope,
  Apple,
  Pill,
  Bot,
  HeartPulse,
  Leaf,
  AlertCircle,
  Info,
  Bell,
  Calendar,
  CheckCircle2,
  Phone,
  ArrowRight,
  Video,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
  const [userName] = useState("John");
  const [lastVisit] = useState("2 days ago");

  const handleEmergencyCall = () => {
    window.location.href = "tel:112"; // Emergency number
  };

  const quickAccessItems = [
    {
      title: "Health Tracker",
      description: "Monitor your vital signs and health metrics",
      icon: HeartPulse,
      link: "/health-tracker",
      color: "bg-red-100 text-red-600",
      actions: [
        {
          label: "View Stats",
          icon: ArrowRight,
          onClick: () => window.location.href = "/health-tracker",
        }
      ]
    },
    {
      title: "Consult Doctor",
      description: "Book appointments with healthcare professionals",
      icon: Stethoscope,
      link: "/consult",
      color: "bg-blue-100 text-blue-600",
      actions: [
        {
          label: "Book Now",
          icon: Calendar,
          onClick: () => window.location.href = "/consult/book",
        },
        {
          label: "Video Call",
          icon: Video,
          onClick: () => window.location.href = "/consult/video",
        }
      ]
    },
    {
      title: "Diet Plans",
      description: "Personalized nutrition and meal planning",
      icon: Apple,
      link: "/diet",
      color: "bg-green-100 text-green-600",
      actions: [
        {
          label: "View Plan",
          icon: ArrowRight,
          onClick: () => window.location.href = "/diet",
        }
      ]
    },
    {
      title: "Ayushman",
      description: "Traditional wellness and holistic health",
      icon: Leaf,
      link: "/ayushman",
      color: "bg-emerald-100 text-emerald-600",
      actions: [
        {
          label: "Explore",
          icon: ArrowRight,
          onClick: () => window.location.href = "/ayushman",
        }
      ]
    },
    {
      title: "Symptoms",
      description: "Track and monitor your symptoms",
      icon: Activity,
      link: "/symptoms",
      color: "bg-purple-100 text-purple-600",
      actions: [
        {
          label: "Log Symptoms",
          icon: Clock,
          onClick: () => window.location.href = "/symptoms/log",
        }
      ]
    },
    {
      title: "Medicine",
      description: "Manage your medications and reminders",
      icon: Pill,
      link: "/medicine",
      color: "bg-orange-100 text-orange-600",
      actions: [
        {
          label: "View Schedule",
          icon: ArrowRight,
          onClick: () => window.location.href = "/medicine",
        }
      ]
    },
    {
      title: "AI Doctor",
      description: "Get instant AI-powered health insights",
      icon: Bot,
      link: "/ai-doctor",
      color: "bg-cyan-100 text-cyan-600",
      actions: [
        {
          label: "Start Chat",
          icon: ArrowRight,
          onClick: () => window.location.href = "/ai-doctor",
        }
      ]
    },
    {
      title: "Emergency",
      description: "Quick access to emergency services",
      icon: AlertCircle,
      link: "/emergency",
      color: "bg-rose-100 text-rose-600",
      actions: [
        {
          label: "Call Emergency",
          icon: Phone,
          onClick: handleEmergencyCall,
          urgent: true
        }
      ]
    },
  ];

  const healthTips = [
    {
      title: "Stay Hydrated",
      description: "Drink at least 8 glasses of water daily for optimal health",
      icon: Info,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Regular Exercise",
      description: "Aim for 30 minutes of physical activity every day",
      icon: Activity,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Balanced Diet",
      description: "Include fruits, vegetables, and whole grains in your meals",
      icon: Apple,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Adequate Sleep",
      description: "Get 7-9 hours of quality sleep each night",
      icon: Bell,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const upcomingAppointments = [
    {
      doctor: "Dr. Sarah Wilson",
      specialty: "General Physician",
      date: "Tomorrow, 10:00 AM",
      type: "Regular Checkup",
    },
    {
      doctor: "Dr. Michael Chen",
      specialty: "Nutritionist",
      date: "Next Week, Tuesday 2:30 PM",
      type: "Diet Consultation",
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                Welcome back, {userName}
              </h1>
              <p className="text-muted-foreground mt-1">
                Your last visit was {lastVisit}
              </p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </Button>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {quickAccessItems.map((item, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${item.color}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  {item.actions.map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      variant={action.urgent ? "destructive" : "secondary"}
                      size="sm"
                      className="w-full"
                      onClick={action.onClick}
                    >
                      <action.icon className="h-4 w-4 mr-2" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Upcoming Appointments */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Appointments
              </h3>
              <Link to="/appointments">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 rounded-lg bg-muted/50"
                >
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Stethoscope className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{appointment.doctor}</h4>
                    <p className="text-sm text-muted-foreground">
                      {appointment.specialty}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Health Tips */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Daily Health Tips
            </h3>
            <div className="space-y-4">
              {healthTips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <div className={`p-2 rounded-full ${tip.color}`}>
                    <tip.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
