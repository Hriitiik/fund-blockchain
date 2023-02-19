import "@/styles/globals.css"
import { ThemeProvider } from "next-themes"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <MoralisProvider initializeOnMount={false}>
                <NotificationProvider>
                    <Component {...pageProps} />
                </NotificationProvider>
            </MoralisProvider>
        </ThemeProvider>
    )
}
