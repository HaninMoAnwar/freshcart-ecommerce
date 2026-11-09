"use client"
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Phone,
  Mail,
  MapPin,
  CreditCard
} from 'lucide-react';

import { SiFacebook, SiX, SiInstagram, SiYoutube } from '@icons-pack/react-simple-icons';
import Image from 'next/image';
import Link from 'next/link';
import LogoImage from "../../public/freshcart-logo.49f1b44d.svg"

export function Footer() {

  // Data for the top features bar
  const features = [
    {
      icon: <Truck className="h-5 w-5 text-emerald-600" />,
      title: 'Free Shipping',
      description: 'On orders over 500 EGP',
    },
    {
      icon: <RotateCcw className="h-5 w-5 text-emerald-600" />,
      title: 'Easy Returns',
      description: '14-day return policy',
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-emerald-600" />,
      title: 'Secure Payment',
      description: '100% secure checkout',
    },
    {
      icon: <Headphones className="h-5 w-5 text-emerald-600" />,
      title: '24/7 Support',
      description: 'Contact us anytime',
    },
  ];

  // Data for footer links layout
  const linkSections = [
    {
      title: 'Shop',
      links: [
        {
          name: 'All Products',
          ref: "/products"
        },
        {
          name: 'Categories',
          ref: "/categories"
        },
        {
          name: 'Brands',
          ref: "/brands"
        }
      ],
    },
    {
      title: 'Account',
      links: [
        {
          name: 'My Account',
          ref: "/"
        },
        {
          name: 'Order History',
          ref: "/allorders"
        },
        {
          name: 'Wishlist',
          ref: "/wishlist"
        },
        {
          name: 'Shopping Cart',
          ref: "/cart"
        },
        {
          name: 'Sign In',
          ref: "/login"
        },
        {
          name: 'Create Account',
          ref: "/signup"
        }
      ],
    },
    {
      title: 'Support',
      links: [
        {
          name: "Contact Us",
          ref: "/contact"
        },
        {
          name: "Help Center",
          ref: "/"
        },
        {
          name: "Shipping Info",
          ref: "/shippingInfo"
        },
        {
          name: "Returns & Refunds",
          ref: "/refunds"
        },
        {
          name: "Track Order",
          ref: "/allOreders"
        },
      ],
    },
    {
      title: 'Legal',
      links: [
        {
          name: "Privacy Policy",
          ref: "/"

        },
        {
          name: "Terms of Service",
          ref: "/"

        },
        {
          name: "Cookie Policy",
          ref: "/"

        },
      ],
    },
  ];
  const socialAccounts = [
    <SiFacebook key="fb" className="h-4 w-4" />,
    <SiX key="tw" className="h-4 w-4" />,
    <SiInstagram key="ig" className="h-4 w-4" />,
    <SiYoutube key="yt" className="h-4 w-4" />
  ]
  return (
    <footer className="w-full bg-[#0f172a] text-gray-400 text-sm">

      {/* 1. TOP FEATURES BAR (Light green/mint banner) */}
      <div className="w-full bg-[#f4fbf9] py-6 border-b border-gray-100">
        <div className="max-w-350 mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                {feature.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm">{feature.title}</span>
                <span className="text-xs text-gray-500 font-medium">{feature.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT */}
      <div className="max-w-350 mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

        {/* Brand & Contact Information (Takes 4 columns on desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Logo Brand Box */}
          <div className="bg-white rounded-xl px-4 py-2 self-start flex items-center gap-2 border border-gray-100 shadow-2xs">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-1.5"
              aria-label="FreshCart footer"
            >
              <Image src={LogoImage} alt="Logo" width={200} height={200} className="w-auto h-auto" />
            </Link>
          </div>

          {/* Description Description */}
          <p className="text-gray-400 leading-relaxed text-xs md:text-sm max-w-sm">
            FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
          </p>

          {/* Contact Details List */}
          <div className="flex flex-col gap-3 text-xs md:text-sm">
            <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
              <Phone className="h-4 w-4 text-emerald-500" />
              <span>+1 (800) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
              <Mail className="h-4 w-4 text-emerald-500" />
              <span>support@freshcart.com</span>
            </div>
            <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
              <MapPin className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>123 Commerce Street, New York, NY 10001</span>
            </div>
          </div>

          {/* Social Media Rounded Buttons */}
          <div className="flex items-center gap-2.5 mt-2">
            {socialAccounts.map((icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-8 h-8 rounded-full bg-gray-800/60 hover:bg-emerald-500 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Links Sections (Takes 8 columns on desktop) */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {linkSections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <h3 className="text-white font-bold tracking-wide text-sm">{section.title}</h3>
              <ul className="flex flex-col gap-2.5 text-xs md:text-sm font-medium">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.ref}
                      className={`hover:text-emerald-400 transition-colors text-gray-400}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* 3. BOTTOM COPYRIGHT & PAYMENT METHODS BAR */}
      <div className="w-full bg-[#090d16] py-6 border-t border-gray-800/40 text-xs text-gray-500">
        <div className="max-w-350 mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright text */}
          <span>© 2026 FreshCart. All rights reserved.</span>

          {/* Payment gateway references */}
          <div className="flex items-center gap-4 font-medium">
            <span className="flex items-center gap-1.5 hover:text-gray-400 transition-colors">
              <CreditCard className="h-3.5 w-3.5" /> Visa
            </span>
            <span className="flex items-center gap-1.5 hover:text-gray-400 transition-colors">
              <CreditCard className="h-3.5 w-3.5" /> Mastercard
            </span>
            <span className="flex items-center gap-1.5 hover:text-gray-400 transition-colors">
              <CreditCard className="h-3.5 w-3.5" /> PayPal
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}
