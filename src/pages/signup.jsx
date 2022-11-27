import { Stack, Flex, Box, Button, Text, Center, Heading, Input } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import logo from '../images/dao.png';
import { useNavigate } from "react-router-dom";
import { title_size } from '../styles/pallete_color';
import { subtitle_size } from '../styles/pallete_color';
import { subtitle_color } from '../styles/pallete_color';
import {useEffect, useState} from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'

export default function Signup(){
    const navigate = useNavigate();

    // function to handle the click on the button
    function handleClick(){
        if(emailController == ''){
            setEmailBool(false);
        }
        if(nameController == ''){
            setNameBool(false);
        }
        if(emailController == '' || nameController == ''){
            return;
        }
        setEmailBool(true);
        setNameBool(true);



        navigate('/questionario', { state: { email: emailController, name: nameController } });
    }

    const [nameBool, setNameBool] = useState(true);
    const [emailBool, setEmailBool] = useState(true);

    const [nameController, setName] = useState('');
    const [emailController, setEmail] = useState('');

    return(
        <Flex direction="column" align="center" justify="start" padding={10}>
            <Image src={logo} alt="logo" />

            <Heading fontSize={title_size}>Ferramenta de análise quantitativa para o gerenciamento sistemático de patrimônio.</Heading>
            <Text fontSize={subtitle_size} color={subtitle_color}>Uma ferramenta que gera uma carteira de investimento totalmente focada em você, investidor</Text>
            

            <Box margin={5}/>

            <FormControl id="name" isRequired isInvalid={!nameBool}>
                <FormLabel>Nome</FormLabel>
                <Input placeholder="Nome" value={nameController} onChange={(e) => setName(e.target.value)}/>
            </FormControl>

            <Box margin={5}/>

            <FormControl id="email" isRequire isInvalid={!emailBool}>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Email" value={emailController} onChange={(e) => setEmail(e.target.value)}/>
            </FormControl>

            <Box margin={5}/>




            <Button width="100%" colorScheme="blue" variant="solid" size="lg" margin={5} onClick={() => handleClick()}>Começar</Button>
            

            </Flex>
    )
}