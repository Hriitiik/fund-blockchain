import { useWeb3Contract, useMoralis, Moralis } from "react-moralis"
import { abi, contractAddresses } from "../../constants"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"

export default function Fund() {
    const [price, setPrice] = useState(0)
    const [btnTxt, setBtnTxt] = useState("Fund")
    const [owner, setOwner] = useState("0x00")
    let fundPrice = (parseFloat(price) * 1e18).toString()
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
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
    const { runContractFunction: getOwner } = useWeb3Contract({
        abi: abi,
        contractAddress: fundAddress,
        functionName: "getOwner",
        params: {},
    })

    async function updateUi() {
        const owner = await getOwner()
        setOwner(owner)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUi()
        }
    }, [isWeb3Enabled])

    const dispatch = useNotification()
    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        window.location.reload()
        setBtnTxt("Fund")
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
        setBtnTxt("Wait")
        document.getElementById("fundBtn").disabled = true
        try {
            async function func() {
                await fund({
                    onSuccess: handleSuccess,
                    onError: (e) => {
                        console.log(e)
                        setBtnTxt("Fund")
                    },
                })
            }
            func()
        } catch (e) {
            window.alert(e)
        }
    }

    return (
        <div className="text-center">
            {isWeb3Enabled ? (
                account.toLowerCase() == owner.toLowerCase() ? (
                    <p></p>
                ) : (
                    <div>
                        <h2 className="py-4 mt-[80px] px-4 font-bold text-4xl tracking-widest">
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
                            id="fundBtn"
                            className="bg-[#ADE792] px-3 py-1 rounded-md ml-4 text-black font-medium font-sans hover:bg-[#301E67]
                hover:text-[#ECF9FF]"
                            onClick={handleClick}
                            disabled={isLoading || isFetching}
                        >
                            {btnTxt}
                        </button>
                        <p className="text-xs">
                            (Min Fundable Amount: 0.01ETH)
                        </p>
                    </div>
                )
            ) : (
                <p>Connect Your Wallet</p>
            )}
        </div>
    )
}
