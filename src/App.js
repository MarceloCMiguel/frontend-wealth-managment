import { ChakraProvider } from '@chakra-ui/react'
import theme from './styles/theme'
import Routes from './routes';


function App() {

    return (
        <ChakraProvider theme={theme}>
            <Routes />
        </ChakraProvider>
    )
}

export default App