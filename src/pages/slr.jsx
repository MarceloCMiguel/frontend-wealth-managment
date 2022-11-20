import { Stack, Flex, Box, Button, Text, Center, Heading, Input } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import logo from '../images/dao.png';
import { useNavigate } from "react-router-dom";
import { RadioGroup, Radio, Stack as Stack2 } from "@chakra-ui/react"
import { React, useState } from 'react';
import { title_size } from '../styles/pallete_color';
import { subtitle_size } from '../styles/pallete_color';
import { subtitle_color } from '../styles/pallete_color';
import { enunciado_size } from '../styles/pallete_color';
import { questao_size } from '../styles/pallete_color';
import { title_color } from '../styles/pallete_color';
import { useEffect } from 'react';

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

export default function SLR(props) {

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log(props.values);
    }, [])

    const format = (value) => {
        return 'R$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }


    const desformat = (value) => {
        return value.replace(/[^0-9]/g, '');
    }

    const [ativos, setAtivos] = useState('');
    const [passivos, setPassivos] = useState('');


    const onSubmit = () => {
        if (ativos == '' || passivos == '') {
            alert('Preencha todos os campos');
            return;
        }
        // convert ativos and passivos to int
        let ativos_int = parseInt(desformat(ativos));
        let passivos_int = parseInt(desformat(passivos));

        let ativos_totais = ativos_int + passivos_int;
        props.handleChange([ativos_totais, passivos_int]);
    };
    return (
        // add a Flex tag with a direction of column, centered in axis y
        <Flex direction="column" align="start" justify="start">

            <Flex direction="column" marginBottom={30}>
                <Heading fontSize={title_size}>Ativos e Passivos</Heading>
                <Text fontSize={subtitle_size} color={subtitle_color} marginBottom={5}>Questionário para ter conhecimento sobre o risco associado ao padrão de vida</Text>
                <Heading fontSize={questao_size}>Ativos totais</Heading>
                <Input placeholder="Ativos" size="lg" marginBottom={5} value={format(ativos)} onChange={(e) => setAtivos(desformat(e.target.value))} />
            </Flex>


            <Flex direction="column" marginBottom={30}>
                <Heading fontSize={questao_size}>Passivos totais</Heading>
                <Input placeholder="Passivos" size="lg" marginBottom={5} value={format(passivos)} onChange={(e) => setPassivos(desformat(e.target.value))} />
            </Flex>
            <Button width="100%" colorScheme="blue" variant="solid" size="lg" onClick={() => onSubmit()}>Próxima</Button>
        </Flex>
    )
}
