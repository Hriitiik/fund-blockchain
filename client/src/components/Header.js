import { useMoralis } from "react-moralis"
import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="px-5 border-b-2 flex flex-row pb-4">
            <div className="ml-auto py-2 px-4 absolute top-2 right-0">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}
