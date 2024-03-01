import Buttons from "./components/button/Buttons";
import Header from "./components/header/Header";
import { TypewriterEffectSmooth } from "./components/ui/typewriter-effect";

const page = () => {
  const words = [
    {
      text: "Collabrative",
    },
    {
      text: "Whiteboarding",
    },
    {
      text: "with",
    },
    {
      text: "Sketchy.",
      className: "text-[#4F46E5] dark:text-[#4F46E5]",
    },
  ];
  return (
    <>
      <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <div className="sticky top-0 z-30">
          <Header />
        </div>

        <div className="flex flex-col gap-10 items-center justify-center h-[40rem]">
          <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
            The road to freedom starts from here
          </p>
          <div className="flex flex-col items-center">
            <h1 className="text-6xl font-bold">Experience the Future of</h1>
            <TypewriterEffectSmooth words={words} />
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <Buttons content="Join Now" type="primary" />
            <Buttons content="Get Started" type="secondary" />
          </div>
        </div>
      </div>
    </>
  )
}

export default page