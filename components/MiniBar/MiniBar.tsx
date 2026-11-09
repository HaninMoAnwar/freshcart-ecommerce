"use client"
import { Gift, Mail, Phone, SquareArrowRightExit, Truck, User, User2, UserPlus } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";

export default function MiniBar() {
    const { status, data } = useSession();
    return (
        <div className="hidden bg-white h-10 items-center justify-between border-b border-gray-200 px-5 lg:flex lg:px-6">
            <div className="flex items-center gap-6 text-sm text-[#6B7280] ">
                <div className="flex items-center gap-2 whitespace-nowrap">
                    <Truck size={16} className="text-[#16A34A]" />
                    <span>Free Shipping on Orders 500 EGP</span>
                </div>

                <div className="flex items-center gap-2 whitespace-nowrap">
                    <Gift size={16} className="text-[#16A34A]" />
                    <span>New Arrivals Daily</span>
                </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-[#6B7280] lg:gap-5 ">
                <a
                    href="tel:+18001234567"
                    className="flex items-center gap-2 whitespace-nowrap"
                >
                    <Phone size={16} />
                    <span>+1 (800) 123-4567</span>
                </a>

                <a
                    href="mailto:support@freshcart.com"
                    className="flex items-center gap-2 whitespace-nowrap"
                >
                    <Mail size={16} />
                    <span>support@freshcart.com</span>
                </a>


                {status === "loading" ? <Spinner /> :
                    status === "unauthenticated" ? <>
                        <div className="h-6 w-px bg-gray-200" />
                        <Link href="/login" className="flex items-center gap-2">
                            <User size={17} />
                            <span>Sign In</span>
                        </Link>

                        <Link href="/signup" className="flex items-center gap-2">
                            <UserPlus size={17} />
                            <span>Sign Up</span>
                        </Link>
                    </> : <>
                        <div className="flex items-center gap-1 text-gray-800 font-medium ">
                            <div className="w-10 h-10 rounded-full  flex items-center justify-center  transition-colors bg-gray-300/10">
                                <User2 className="h-5 w-5" />
                            </div>
                            <span>{data?.user.name}</span>
                        </div>
                        <Button onClick={() => signOut({ callbackUrl: "/" })} variant={"link"} className="flex justify-between items-center gap-1 hover:no-underline cursor-pointer">
                            <span className="text-xs">Sign Out</span>
                            <SquareArrowRightExit size={20} />
                        </Button>
                    </>}
            </div>
        </div >
    )
}
