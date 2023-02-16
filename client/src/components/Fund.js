export default function Fund() {
    return (
        <div className="text-center">
            <h2 className="py-4 px-4 font-sans text-2xl">
                Please help us by providing some funds!
            </h2>
            <input
                className="rounded md px-4"
                placeholder="Enter Amount in Ethers"
            />
            <button className="bg-white px-2 rounded-md ml-4 text-black font-medium font-sans hover:bg-slate-300">
                Fund
            </button>
            <p className="text-xs">(Min Fundable Amount: 0.01ETH)</p>
        </div>
    )
}
