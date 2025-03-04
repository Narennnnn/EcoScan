import { Offer } from '@/types/offers';

export const defaultOffers: Offer[] = [
  {
    id: "1",
    title: "10% Off Next Purchase",
    description: "Get 10% off on your next eco-friendly purchase",
    pointsRequired: 20,
    type: "discount",
    tier: "basic"
  },
  {
    id: "2",
    title: "Free Recycling Kit",
    description: "Get a free clothing recycling kit",
    pointsRequired: 50,
    type: "freebie",
    tier: "basic"
  },
  {
    id: "3",
    title: "Eco-Friendly Laundry Guide",
    description: "Digital guide for sustainable clothing care",
    pointsRequired: 30,
    type: "digital",
    tier: "basic"
  },
  {
    id: "4",
    title: "Carbon Offset Certificate",
    description: "Receive a certificate for your carbon savings",
    pointsRequired: 75,
    type: "certificate",
    tier: "eco"
  },
  {
    id: "5",
    title: "20% Off Sustainable Brands",
    description: "Get 20% off on selected sustainable fashion brands",
    pointsRequired: 100,
    type: "discount",
    tier: "eco"
  },
  {
    id: "6",
    title: "Eco-Friendly Fabric Care Kit",
    description: "Kit includes natural detergent and fabric care items",
    pointsRequired: 80,
    type: "product",
    tier: "eco"
  },
  {
    id: "7",
    title: "Sustainable Fashion Consultation",
    description: "One-on-one session with a sustainable fashion expert",
    pointsRequired: 150,
    type: "service",
    tier: "premium"
  },
  {
    id: "8",
    title: "Eco-Wardrobe Makeover",
    description: "Complete wardrobe sustainability assessment and recommendations",
    pointsRequired: 200,
    type: "service",
    tier: "premium"
  },
  {
    id: "9",
    title: "Sustainable Shopping Spree",
    description: "50% off on sustainable fashion items up to $200",
    pointsRequired: 175,
    type: "discount",
    tier: "premium"
  },
  {
    id: "10",
    title: "VIP Sustainable Fashion Event",
    description: "Exclusive access to sustainable fashion shows and events",
    pointsRequired: 250,
    type: "experience",
    tier: "elite"
  }
]; 