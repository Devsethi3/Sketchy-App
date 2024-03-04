import Image from "next/image"
import Buttons from "./components/button/Buttons"
import Link from "next/link"

const NotFoundPage = () => {
    return (
        <div>
            <div className="h-screen w-screen flex items-center justify-center flex-col">
                <Image src="images/NotFound.svg" alt="not-found" width={500} height={500} />
                <Link href="/">
                    <Buttons content="Back To Home" type="primary" />
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage