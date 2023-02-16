import Header from "../components/Header"
import Fund from "../components/Fund"
import Details from "../components/Details"

export default function Home() {
    return (
        <>
            <title>Fund Me Contract</title>
            <div className="">
                <h1 className="font-medium leading-tight text-3xl mt-2 mb-1 pt-2 text-center font-sans">
                    🐶 Welcome to XYZ Animal Care Organization's Funding Site 😺
                </h1>
                <Header />
                <Fund />
                <Details />
            </div>
        </>
    )
}
