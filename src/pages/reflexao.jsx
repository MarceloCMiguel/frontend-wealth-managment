import { Stack, Flex, Box, Button, Text, Center, Heading } from '@chakra-ui/react'
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
import { useToast } from "@chakra-ui/react"
export default function Reflexao(props) {

  const [q1, setValue] = useState('0');
  const [q2, setValue2] = useState('0');

  const toast = useToast();
  const onSubmit = () => {

    if (q1 == '0' || q2 == '0') {
      toast({
        title: "Ops",
        description: "Por favor, responda todas as questões",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }


    if (q1 == '1' && q2 == '2') {
      props.handleChange(1);
    }
    else {
      props.handleChange(0);
    }
  };
  return (
    // add a Flex tag with a direction of column, centered in axis y
    <Flex direction="column" align="start" justify="start">

      <Flex direction="column" marginBottom={30}>
        <Heading fontSize={title_size}>Reflexão</Heading>
        <Text fontSize={subtitle_size} color={subtitle_color} marginBottom={5}>Para cada uma das opções, selecione aquela que mais se adeque ao seu perfil de investidor</Text>
        <Heading fontSize={questao_size}>Questão 1</Heading>
        <RadioGroup onChange={setValue} value={q1}>
          <Stack direction='column'>
            <Stack direction='row'>
              <Radio value="1" >Um ganho certo de R$ 20,00</Radio>

            </Stack>
            <Stack direction='row'>
              <Radio value="2">33% de chance de ganhar R$ 60,00</Radio>
            </Stack>
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex direction="column" marginBottom={30} >
        <Heading fontSize={questao_size}>Questão 2</Heading>
        <RadioGroup onChange={setValue2} value={q2}>
          <Stack direction='column'>
            <Stack direction='row'>
              <Radio value="1">Uma perda certa de R$ 20,00</Radio>

            </Stack>
            <Stack direction='row'>
              <Radio value="2">33% de chance de perder R$ 60,00</Radio>
            </Stack>
          </Stack>

        </RadioGroup>
      </Flex>

      <Button width="100%" colorScheme="blue" variant="solid" size="lg" onClick={() => onSubmit()}>Próxima</Button>
    </Flex>
  )
}
