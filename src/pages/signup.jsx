import { Stack, Flex, Box, Button, Text, Center, Heading } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import logo from '../images/dao.png';
import { useNavigate } from "react-router-dom";
export default function Signup(){
    const navigate = useNavigate();

    // function to handle the click on the button
    function handleClick(){
        navigate('/questionario');
    }

    return(
        <Flex direction="column" align="center" justify="start" padding={10}>
            <Image src={logo} alt="logo" />

            <Heading>Ferramenta de análise quantitativa para o gerenciamento sistemático de patrimônio.</Heading>
            <Text>Uma ferramenta que gera uma carteira de investimento totalmente focada em você, investidor</Text>
            
            <Box margin={10}>
                </Box>

            


            <Button width="100%" colorScheme="blue" variant="solid" size="lg" margin={5} onClick={() => handleClick()}>Entrar</Button>
            </Flex>
    )
}