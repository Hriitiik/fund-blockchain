import { useWeb3Contract, useMoralis } from "react-moralis"
import { abi, contractAddresses } from "../../constants"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"

export default function Fund() {
    const [price, setPrice] = useState(0)
    const [update, setUpdate] = useState(price)
    let fundPrice = (parseFloat(update) * 1e18).toString()
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const fundAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const {
        runContractFunction: fund,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: fundAddress,
        functionName: "fund",
        params: {},
        msgValue: fundPrice,
    })

    const dispatch = useNotification()
    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        window.location.reload(false)
    }
    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete",
            title: "Tx Notification",
            position: "topR",
            icon: "🔔",
        })
    }
    const handleChange = (event) => {
        setPrice(event.target.value)
    }
    const handleClick = () => {
        setUpdate(price)
        try {
            async function func() {
                await fund({
                    onSuccess: handleSuccess,
                    onError: (e) => console.log(e),
                })
            }
            func()
        } catch (e) {
            window.alert(e)
        }
    }
    return (
        <div className="text-center">
            <h2 className="py-4 px-4 font-sans text-2xl">
                Please help us by providing some funds!
            </h2>
            <input
                className="rounded md px-4"
                placeholder="Enter Amount in Ethers"
                name="price"
                type="text"
                onChange={handleChange}
            />
            <button
                className="bg-white px-2 rounded-md ml-4 text-black font-medium font-sans hover:bg-slate-300"
                onClick={handleClick}
                disabled={isLoading || isFetching}
            >
                Fund
            </button>
            <p className="text-xs">(Min Fundable Amount: 0.01ETH)</p>
        </div>
    )
}
