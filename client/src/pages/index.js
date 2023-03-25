import Header from "../components/Header"
import Fund from "../components/Fund"
import Details from "../components/Details"

export default function Home() {
    return (
        <>
            <div className="h-screen bg-[#ECF9FF] text-[#301E67] overflow-hidden text-xl">
                <title>Fund Me Contract</title>
                <h1 className="text-5xl leading-tight mt-8 mb-3 pt-2 text-center font-bold">
                    🐶 Welcome to XYZ Animal Care Organization's Funding Site 😺
                </h1>
                <Header />
                <Fund />
                <Details />
            </div>
        </>
    )
}
