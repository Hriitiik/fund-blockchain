export default function Details() {
    return (
        <div className="text-center">
            <br />
            <p className="font-sans">Owner Address</p> <br />
            <p className="font-sans">Total Amount Funded</p>
            <br />
            <p>Current Amount in contract</p>
            <br />
            <button className="bg-white px-2 rounded-md text-black font-medium font-sans hover:bg-slate-300">
                Withdraw
            </button>
            <br />
            <p className="font-sans">
                (⚠️ Funds can be withrawn by owner only! ⚠️)
            </p>
            <br />
            <p>My Funded Amount</p>
        </div>
    )
}
