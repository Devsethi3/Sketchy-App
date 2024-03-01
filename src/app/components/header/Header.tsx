import Link from "next/link"
import Buttons from "../button/Buttons"
import Image from "next/image"

const Header = () => {
    return (
        <div className="border-b-2 shadow-lg">
            <header className="container">
                <div className="backdrop-blur-sm">
                    <div className="flex h-20 items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
                            <p className="text-3xl font-extrabold pl-4 border-l-2 border-black">SKETCHY</p>
                        </Link>
                        <div className="hidden md:block">
                            <nav aria-label="Global">
                                <ul className="flex items-center gap-10">
                                    <li>
                                        <Link href="/" className="text-gray-700 transition hover:text-gray-700/75"> Home </Link>
                                    </li>
                                    <li>
                                        <Link href="/" className="text-gray-700 transition hover:text-gray-700/75"> About </Link>
                                    </li>
                                    <li>
                                        <Link href="/" className="text-gray-700 transition hover:text-gray-700/75"> Pricing </Link>
                                    </li>
                                    <li>
                                        <Link href="/dashboard" className="text-gray-700 transition hover:text-gray-700/75"> Dashboard </Link>
                                    </li>
                                    <li>
                                        <Link href="/" className="text-gray-700 transition hover:text-gray-700/75"> Team </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                <Buttons content="Login" type="primary" />

                                <div className="hidden sm:flex">
                                    <Buttons content="Register" type="secondary" />

                                </div>
                            </div>

                            <div className="block md:hidden">
                                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header