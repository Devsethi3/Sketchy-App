"use client";
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc"

const LoginPage = () => {
    const { data: session } = useSession();

    const router = useRouter()

    const handleSignIn = async () => {
        const result = await signIn('google', { callbackUrl: `/dashboard/${session?.user?.email}` });

        if (result?.error) {
            console.error("Sign-in failed:", result.error);
        } else if (result?.url) {
            router.push(result.url);
        }
    };

    return (
        <>
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </aside>

                    <main
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                    >
                        <div className="max-w-xl lg:max-w-3xl">

                            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                Welcome to Sketchy
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                                quibusdam aperiam voluptatum.
                            </p>

                            <div className="flex flex-col items-center gap-5 mt-5">
                                <button onClick={handleSignIn} className="flex bg-[#d2d2ff]  rounded-md transition-all w-full items-center gap-3 py-2.5 justify-center">
                                    <FcGoogle className="text-xl" />
                                    <span className="pt-[.3rem] font-medium">Continue With Google</span>
                                </button>
                            </div>

                            <span className="relative mt-8 flex justify-center">
                                <div
                                    className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
                                ></div>

                                <span className="relative z-10 bg-white px-6">or</span>
                            </span>

                            <form action="#" className="mt-8 grid grid-cols-6 gap-6">

                                <div className="col-span-6">
                                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

                                    <input
                                        type="email"
                                        id="Email"
                                        name="email"
                                        className="mt-1 w-full rounded-md focus-visible:ring-2 focus-visible:ring-[#4F46E5] outline-none py-2 px-4 pt-[.5rem] bg-slate-100 text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                                    <input
                                        type="password"
                                        id="Password"
                                        name="password"
                                        className="mt-1 w-full rounded-md focus-visible:ring-2 focus-visible:ring-[#4F46E5] outline-none py-2 px-4 pt-[.5rem] bg-slate-100 text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                                        Password Confirmation
                                    </label>

                                    <input
                                        type="password"
                                        id="PasswordConfirmation"
                                        name="password_confirmation"
                                        className="mt-1 w-full rounded-md focus-visible:ring-2 focus-visible:ring-[#4F46E5] outline-none py-2 px-4 pt-[.5rem] bg-slate-100 text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <p className="text-sm text-gray-500">
                                        By creating an account, you agree to our
                                        <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                                        and
                                        <a href="#" className="text-gray-700 underline">privacy policy</a>.
                                    </p>
                                </div>

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button
                                        className="inline-block shrink-0 rounded-md border-2 border-[#4F46E5] bg-[#4F46E5] px-8 py-2.5 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#4F46E5] focus:outline-none focus:ring active:text-blue-500 pt-[.8rem]"
                                    >
                                        Create an account
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Already have an account?
                                        <a href="#" className="text-gray-700 underline">Log in</a>.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>
        </>
    )
}

export default LoginPage

