"use client";

import Link from "next/link";
import {

  User,
  UserPlus,
  Search,
  ChevronDown,
  Headset,
  Heart,
  ShoppingCart,
  Menu,
  X,
  Headphones,
  User2,
  CircleUserRound,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
}
  from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LogoImage from "../../public/freshcart-logo.49f1b44d.svg"
import { useCategories } from "@/context/categoriesContext";
import { useEffect } from "react";
import { BrandsResponse, CategoriesResponse, SubcategoryResponse } from "@/types/responses.type";
import { getAllCategories, getAllSubcategories } from "@/actions/categories.action";
import { getAllBrands } from "@/services/brands.service";
import { useBrands } from "@/context/brandsContext";
import { signOut, useSession } from "next-auth/react";
import { Spinner } from "../ui/spinner";
import { cn } from "cn";
import { getUserCart } from "@/actions/cart.action";
import { useCart } from "@/context/cartContext";
import { Badge } from "../ui/badge";
import { CartResponse } from "@/interfaces/cart.interface";


export default function Navbar() {


  const { allCategories, setAllCategories, setAllSubcategories } = useCategories();
  const { setAllBrands } = useBrands();
  const { numOfCartItems, updateNumOfCartItems,updateCartId,updateCartInfo } = useCart();
  const { status, data } = useSession();

  useEffect(() => {
    async function getCategoriesAndBrands() {
      const CategoriesData: CategoriesResponse = await getAllCategories();
      const SubcategoriesData: SubcategoryResponse = await getAllSubcategories();
      const brandsData: BrandsResponse = await getAllBrands();
      setAllBrands(brandsData.data);
      setAllCategories(CategoriesData.data);
      setAllSubcategories(SubcategoriesData.data);
    }

    getCategoriesAndBrands();


  }, [])
  useEffect(() => {
    if (status === "authenticated") {
      getUserCart().then(function (data:CartResponse) {      
        updateNumOfCartItems(data.numOfCartItems);
        updateCartId(data.cartId);
        updateCartInfo(data);
      })
    }
  }, [status,numOfCartItems])


  function signOutHandler() {
    signOut({ callbackUrl: "/" })
  }
  return (
    <nav className="w-full sticky z-50 top-0">


      {/* Main navbar: Desktop and tablet */}
      <div className="w-full bg-white text-[#263449] ">

        <div className=" hidden h-19 items-center justify-between gap-4 px-5 lg:flex lg:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-1.5"
            aria-label="FreshCart home"
          >
            <Image src={LogoImage} alt="Logo" width={200} height={200} className="w-auto h-auto" />
          </Link>

          {/* Search */}
          <div
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="flex h-10 min-w-0 max-w-120 flex-1 items-center rounded-full border border-gray-200 pl-5 pr-1.5"
          >
            <input
              type="search"
              placeholder="Search for products, brands and more..."
              aria-label="Search products"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9CA3AF] lg:text-md"
            />

            <Link href={"/search"}
              type="submit"
              aria-label="Search"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:bg-[#079447]"
            >
              <Search size={15} />
            </Link>
          </div>

          {/* Navigation links */}
          <div className="flex shrink-0 items-center gap-1 text-xl lg:gap-2 lg:text-lg">
            <Link href="/" className="transition hover:text-primary">
              Home
            </Link>

            <Link href="/products" className="transition hover:text-primary">
              Shop
            </Link>


            <DropdownMenu >
              <DropdownMenuTrigger render={<Button variant="ghost" className=" transition hover:text-primary hover:bg-white text-xl lg:gap-2 lg:text-lg font-normal" />}>
                Categories
                <ChevronDown size={17} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup className={"space-y-2 w-xl"}>
                  <DropdownMenuItem className={"hover:text-primary-dark hover:bg-primary-50"}><Link href={`/products`}>All Categories</Link> </DropdownMenuItem>
                  {allCategories && allCategories.map((categoryItem) =>
                    <DropdownMenuItem key={categoryItem._id} className={`hover:text-primary-dark hover:bg-primary-50`}><Link href={`/products?category=${categoryItem._id}`}>{categoryItem.name}</Link> </DropdownMenuItem>
                  )
                  }
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>



            <Link href="/brands" className="transition hover:text-primary">
              Brands
            </Link>
          </div>

          {/* Support */}
          <div className="hidden shrink-0 items-center gap-1 xl:flex">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#F0FCF5] text-primary">
              <Headset size={20} />
            </div>

            <div className="whitespace-nowrap text-sm">
              <p className="text-[#9CA3AF]">Support</p>
              <p className="font-semibold">24/7 Help</p>
            </div>
          </div>


          {/* Uer Profile */}
          {status === "loading" ? <Spinner /> :
            status === "authenticated" ?
              <>
                <Link
                  href="/cart"
                  aria-label="Shopping cart"
                  className="shrink-0 text-[#6B7280] transition hover:text-primary relative "
                >
                  <ShoppingCart size={24} />
                  <Badge className="absolute -top-3 -right-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white border-2 border-white shadow-xs">
                    {numOfCartItems}
                  </Badge>

                </Link>
                <Link
                  href="/wishlist"
                  aria-label="Wishlist"
                  className="flex shrink-0 items-center justify-center border-l border-gray-200 pl-4 text-[#6B7280] transition hover:text-primary lg:pl-6"
                >
                  <Heart size={24} />
                </Link>
                <DropdownMenu >
                  <DropdownMenuTrigger>
                    <CircleUserRound size={24} className="text-[#6B7280] hover:text-primary" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup className={"space-y-2 w-full "}>
                      <DropdownMenuItem >
                        <Link href={`/profile`}>My Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/settings`}>Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className={"text-red-600 "} variant="destructive">
                        <Button onClick={signOutHandler} variant={"link"} className={"p-0 text-red-600 hover:no-underline hover:text-red-600"}>Sign Out</Button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
              :
              <Link
                href="/login"
                className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-2 text-base font-semibold text-white shadow-sm transition hover:bg-[#079447] lg:px-4"
              >
                <User size={18} />
                <span>Sign In</span>
              </Link>

          }

        </div>
        {/* Mobile navbar */}
        <Sheet >
          <div className=" lg:hidden flex h-15 w-full items-center justify-between border-b-2 border-primary px-5">
            <Link href="/" aria-label="FreshCart home">
              <Image
                src={LogoImage}
                alt="FreshCart"
                width={200}
                height={200}
                className="h-auto w-36"
              />
            </Link>

            <div className="flex justify-between gap-5">
              <div className="flex items-center gap-5 text-[#6B7280]">
                {status === "loading" ? <Spinner /> :
                  status === "authenticated" ?
                    <>
                      <Link href="/wishlist" aria-label="Wishlist">
                        <Heart size={25} />
                      </Link>
                      <Link href="/cart" aria-label="Shopping cart">
                        <ShoppingCart size={25} />
                      </Link>
                    </>
                    : ""}
              </div>
              <SheetTrigger className="lg:hidden text-white bg-primary-dark rounded-full p-2">
                <Menu size={18} />
              </SheetTrigger>
            </div>
          </div>
          <SheetContent side="right" className={"p-0 flex flex-col justify-between h-full bg-white border-r border-gray-100 overflow-y-auto "}>
            <div className="flex flex-col p-4 flex-1">

              <Link href="/" aria-label="FreshCart home" className="mb-5">
                <Image
                  src={LogoImage}
                  alt="FreshCart"
                  width={200}
                  height={200}
                  className="h-auto w-36"
                />
              </Link>



              <div
                role="search"
                onSubmit={(event) => event.preventDefault()}
                className="flex h-10 min-w-0 max-w-120 flex-1 items-center rounded-full border border-gray-200 pl-5 pr-1.5 mb-2"
              >
                <input
                  type="search"
                  placeholder="Search for products, brands and more..."
                  aria-label="Search products"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9CA3AF] lg:text-md"
                />

                <Link href={"/search"}
                  type="submit"
                  aria-label="Search"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:bg-[#079447]"
                >
                  <Search size={15} />
                </Link>
              </div>

              <nav className="flex flex-col gap-4 text-gray-700 font-medium text-base my-6 space-y-4">
                <Link href="/" className="hover:text-emerald-500 transition-colors">Home</Link>
                <Link href="/products" className="hover:text-emerald-500 transition-colors">Shop</Link>
                <Link href="/categories" className="hover:text-emerald-500 transition-colors">Categories</Link>
                <Link href="/brands" className="hover:text-emerald-500 transition-colors">Brands</Link>
              </nav>

              <hr className="border-gray-100 mb-6" />

              <div className="flex flex-col gap-4">
                {status === "loading" ? <Spinner /> :
                  status === "authenticated" ?
                    <>
                      <Link href="/profile" className="flex items-center gap-3 text-gray-800 font-medium hover:text-emerald-500 group">
                        <div className="w-10 h-10 rounded-full  flex items-center justify-center  transition-colors bg-gray-300/10">
                          <User2 className="h-5 w-5" />
                        </div>
                        <span>{data.user.name}</span>
                      </Link>
                      <Link href="/wishlist" className="flex items-center gap-3 text-gray-800 font-medium hover:text-emerald-500 group">
                        <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-100 transition-colors">
                          <Heart className="h-5 w-5 fill-current" />
                        </div>
                        <span>Wishlist</span>
                      </Link>
                      <Link href="/cart" className="flex items-center gap-3 text-gray-800 font-medium hover:text-emerald-500 group">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-100 transition-colors">
                          <ShoppingCart className="h-5 w-5" />
                        </div>
                        <span>Cart</span>
                      </Link>
                    </>

                    : ""}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex flex-col gap-4 bg-gray-50/50">
              {/* Sign In & Sign Up */}
              {status === "loading" ? <Spinner /> :
                status === "unauthenticated" ? <div className="grid grid-cols-2 gap-3">
                  <Link href={"/login"} className="text-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl transition-all">
                    Sign In
                  </Link>
                  <Link href={"/signup"} className="text-center border-emerald-500 text-emerald-500 hover:bg-emerald-50 font-semibold py-2.5 rounded-xl transition-all">
                    Sign Up
                  </Link>
                </div> : ""}

              <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <Headphones className="h-5 w-5" />
                </div>
                <div className="flex flex-col text-sm">
                  <span className="text-gray-500 font-medium">Need Help?</span>
                  <a href="#" className="text-emerald-500 font-semibold hover:underline">Contact Support</a>
                </div>
              </div>
            </div>

          </SheetContent>
        </Sheet>
      </div>

    </nav>

  );
}
