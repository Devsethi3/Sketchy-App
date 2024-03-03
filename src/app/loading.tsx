import Image from "next/image"

const Loading = () => {
    return (
        <>
            <div className="w-screen h-screen flex items-center justify-center">
                <Image src="/images/logo.svg" width={120} height={120} alt="laoding-logo" className="animate-pulse" />
            </div>
        </>
    )
}

export default Loading