import { Heart, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InstagramIcon } from "lucide-react";
import {TwitterIcon} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-2">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              WishCare
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner for hassle-free online shopping with complete care and satisfaction.
            </p>
            <div className="flex space-x-2">
                <InstagramIcon className="h-5 w-5 hover:text-primary" />
                <Linkedin className="h-5 w-5 hover:text-primary" />
                <TwitterIcon className="h-5 w-5 hover:text-primary" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Categories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Care</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Track Your Order</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-gray-400">Subscribe to get special offers and updates</p>
            <div className="space-y-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Mail className="h-5 w-5 text-purple-400" />
              <span className="text-gray-400">support@wishcare.com</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Phone className="h-5 w-5 text-purple-400" />
              <span className="text-gray-400">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <MapPin className="h-5 w-5 text-purple-400" />
              <span className="text-gray-400">New Delhi, India 110007</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 WishCare. All rights reserved. Made with 
            <Heart className="inline h-4 w-4 mx-1 text-red-400 fill-current" /> 
            for our customers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
