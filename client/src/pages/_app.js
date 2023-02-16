import "@/styles/globals.css"
import { ThemeProvider } from "next-themes"
import { MoralisProvider } from "react-moralis"

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <MoralisProvider initializeOnMount={false}>
                <Component {...pageProps} />
            </MoralisProvider>
        </ThemeProvider>
    )
}
