import { Stack, Flex, Box, Button, Text, Center, Heading, useToast } from '@chakra-ui/react'
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
export default function AversaoRisco(props) {

  // useEffect(() => {
  //   // 👇️ scroll to top on page load
  //   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  // }, []);


  const [q1, setValue] = useState('0');
  const [q2, setValue2] = useState('0');
  const [q3, setValue3] = useState('0');
  const [q4, setValue4] = useState('0');
  const [q5, setValue5] = useState('0');
  const toast = useToast();
  const onSubmit = () => {
    if (q1 == '0' || q2 == '0' || q3 == '0' || q4 == '0' || q5 == '0') {
      
      toast({
        title: "Ops",
        description: "Por favor, responda todas as questões",
        status: "error",
        duration: 5000,
        isClosable: true,
        });
        return;

      
    }

    if (q1 == '1' && q2 == '1' && q3 == '1' && q4 == '1' && q5 == '1') {
      props.handleChange(12);
    }
    else if (q1 == '1' && q2 == '1' && q3 == '1' && q4 == '1' && q5 == '2') {
      props.handleChange(7);
    }
    else if (q1 == '1' && q2 == '1' && q3 == '1' && q4 == '2' && q5 == '2') {
      props.handleChange(4.5);
    }
    else if (q1 == '1' && q2 == '1' && q3 == '2' && q4 == '2' && q5 == '2') {
      props.handleChange(3);
    }
    else if (q1 == '1' && q2 == '2' && q3 == '2' && q4 == '2' && q5 == '2') {
      props.handleChange(2);
    }
    else if (q1 == '2' && q2 == '2' && q3 == '2' && q4 == '2' && q5 == '2') {
      props.handleChange(1.5);
    }
  };
  return (
    // add a Flex tag with a direction of column, centered in axis y
    <Flex direction="column" align="center" justify="start">
      <Flex direction="column" marginBottom={30}>
        <Heading fontSize={title_size}>Aversão ao risco</Heading>
        <Text fontSize={subtitle_size} color={subtitle_color} marginBottom={5}>Para cada uma das opções, selecione aquela que mais se adeque ao seu perfil de investidor</Text>
        <Heading fontSize={questao_size}>Questão 1</Heading>
        <RadioGroup onChange={setValue} value={q1}>
          <Stack direction='column'>
            <Stack direction='row'>
              <Radio value="1" >50% de chance de ganhar R$2.00, 50% de chance de ganhar R$1,60.</Radio>

            </Stack>
            <Stack direction='row'>
              <Radio value="2">50% de chance de ganhar R$3.85, 50% de chance de ganhar R$0,10.</Radio>
            </Stack>
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex direction="column" marginBottom={30}>
        <Heading fontSize={questao_size}>Questão 2</Heading>
        <RadioGroup onChange={setValue2} value={q2}>
          <Stack direction='column'>
            <Stack direction='row'>
              <Radio value="1">60% de chance de ganhar R$2.00, 40% de chance de ganhar R$1,60.</Radio>

            </Stack>
            <Stack direction='row'>
              <Radio value="2">60% de chance de ganhar R$3.85, 40% de chance de ganhar R$0,10.</Radio>
            </Stack>
          </Stack>

        </RadioGroup>
      </Flex>
      <Flex direction="column" marginBottom={30}>
        <Heading fontSize={questao_size}>Questão 3</Heading>
        <RadioGroup onChange={setValue3} value={q3}>
          <Stack direction='column'>
            <Stack direction='row'>
              <Radio value="1">70% de chance de ganhar R$2.00, 30% de chance de ganhar R$1,60.</Radio>

            </Stack>
            <Stack direction='row'>
              <Radio value="2">70% de chance de ganhar R$3.85, 30% de chance de ganhar R$0,10.</Radio>
            </Stack>
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex direction="column" marginBottom={30}>
        <Heading fontSize={questao_size}>Questão 4</Heading>
        <RadioGroup onChange={setValue4} value={q4}>
          <Stack direction='column'>
            <Stack direction='row'>
              <Radio value="1">80% de chance de ganhar R$2.00, 20% de chance de ganhar R$1,60.</Radio>

            </Stack>
            <Stack direction='row'>
              <Radio value="2">80% de chance de ganhar R$3.85, 20% de chance de ganhar R$0,10.</Radio>
            </Stack>
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex direction="column" marginBottom={30}>
        <Heading fontSize={questao_size}>Questão 5</Heading>
        <RadioGroup onChange={setValue5} value={q5}>
          <Stack direction='column'>
            <Stack direction='row'>
              <Radio value="1">90% de chance de ganhar R$2.00, 10% de chance de ganhar R$1,60.</Radio>

            </Stack>
            <Stack direction='row'>
              <Radio value="2">90% de chance de ganhar R$3.85, 10% de chance de ganhar R$0,10.</Radio>
            </Stack>
          </Stack>
        </RadioGroup>
      </Flex>
      <Button width="100%" colorScheme="blue" variant="solid" size="lg" margin={5} onClick={() => { onSubmit(); }}>Próxima</Button>
    </Flex>
  )
}
