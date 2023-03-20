import { useWeb3Contract, useMoralis } from "react-moralis"
import { abi, contractAddresses } from "../../constants"
import { useEffect, useState } from "react"
import { ethers } from "ethers"

export default function Details() {
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const [owner, setOwner] = useState("0x00")
    const [totalAmt, setTotalAmt] = useState("0")
    const [currentBalance, setCurrentBalance] = useState("0")
    const [myFund, setMyFund] = useState("0")
    const chainId = parseInt(chainIdHex)
    const fundAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const { runContractFunction: getOwner } = useWeb3Contract({
        abi: abi,
        contractAddress: fundAddress,
        functionName: "getOwner",
        params: {},
    })
    const { runContractFunction: getTotalAmount } = useWeb3Contract({
        abi: abi,
        contractAddress: fundAddress,
        functionName: "getTotalAmount",
        params: [],
    })
    const { runContractFunction: getCurrentBalance } = useWeb3Contract({
        abi: abi,
        contractAddress: fundAddress,
        functionName: "getBalance",
        params: [],
    })
    const { runContractFunction: withdraw } = useWeb3Contract({
        abi: abi,
        contractAddress: fundAddress,
        functionName: "withdraw",
        params: {},
    })

    const { runContractFunction: getAddress2Amt } = useWeb3Contract({
        abi: abi,
        contractAddress: fundAddress,
        functionName: "getAddress2Amt",
        params: {
            funder: account,
        },
    })
    async function updateUi() {
        const owner = await getOwner()
        setOwner(owner)
        const totalAmt = (await getTotalAmount()).toString()
        setTotalAmt(totalAmt)
        const currentBal = (await getCurrentBalance()).toString()
        setCurrentBalance(currentBal)
        const myFund = (await getAddress2Amt()).toString()
        setMyFund(myFund)
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUi()
        }
    }, [isWeb3Enabled])
    const handleWithdraw = async () => {
        try {
            if (parseFloat(currentBalance) == 0) {
                window.alert("No Balance in Contract!")
            } else {
                await withdraw()
                window.alert("Withdrawn Successfully")
                window.location.reload(false)
            }
        } catch (e) {
            window.alert(e)
        }
    }
    return (
        <div className="text-center">
            <br />
            <p className="font-sans">Owner Address: {owner}</p> <br />
            <p className="font-sans">
                Total Amount Funded: {parseFloat(totalAmt) / parseFloat(1e18)}{" "}
                Ethers
            </p>
            <br />
            <p>
                Current Amount in contract:{" "}
                {parseFloat(currentBalance) / parseFloat(1e18)} Ethers
            </p>
            <br />
            {isWeb3Enabled ? (
                account.toLowerCase() == owner.toLowerCase() ? (
                    <button
                        className="bg-white px-2 rounded-md text-black font-medium font-sans hover:bg-slate-300"
                        onClick={handleWithdraw}
                    >
                        Withdraw
                    </button>
                ) : (
                    <p className="font-sans">
                        (⚠️ Funds can be withrawn by owner only! ⚠️)
                    </p>
                )
            ) : (
                <p>Connect Your Wallet</p>
            )}
            <br />
            <br />
            <p>Contract Address: {fundAddress}</p>
            <br />
            <p>
                My Funded Amount: {parseFloat(myFund) / parseFloat(1e18)} Ethers
            </p>
        </div>
    )
}

//goerli contract  "5":["0xA3Ed421cB091F8c841c7445EfD20e8C1F1ebA274"]
