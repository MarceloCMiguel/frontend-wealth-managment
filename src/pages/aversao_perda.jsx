import {
  Stack,
  Flex,
  Box,
  Button,
  Text,
  Center,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import logo from "../images/dao.png";
import { useNavigate } from "react-router-dom";
import { RadioGroup, Radio, Stack as Stack2 } from "@chakra-ui/react";
import { React, useState } from "react";
import { questao_size, subtitle_size } from "../styles/pallete_color";
import { subtitle_color } from "../styles/pallete_color";
import { title_size } from "../styles/pallete_color";
import { title_color } from "../styles/pallete_color";
import { enunciado_size } from "../styles/pallete_color";
import { useEffect } from "react";
export default function AversaoPerda(props) {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const [q1, setValue] = useState("0");
  const [q2, setValue2] = useState("0");
  const [q3, setValue3] = useState("0");
  const [q4, setValue4] = useState("0");
  const toast = useToast();
  const onSubmit = () => {
    if (q1 == "0" || q2 == "0" || q3 == "0" || q4 == "0") {
      toast({
        title: "Ops",
        description: "Por favor, responda todas as questões",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (q1 == "1" && q2 == "1" && q3 == "1" && q4 == "1") {
      props.handleChange(1);
    } else if (q1 == "1" && q2 == "1" && q3 == "1" && q4 == "2") {
      props.handleChange(1.2);
    } else if (q1 == "1" && q2 == "1" && q3 == "2" && q4 == "2") {
      props.handleChange(1.5);
    } else if (q1 == "1" && q2 == "2" && q3 == "2" && q4 == "2") {
      props.handleChange(2);
    } else if (q1 == "2" && q2 == "2" && q3 == "2" && q4 == "2") {
      props.handleChange(3);
    } else {
      toast({
        title: "Ops",
        description:
          "Houve uma inconsistência nos dados, por favor, tente novamente",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    // add a Flex tag with a direction of column, centered in axis y
    <Flex direction="column" align="center" justify="start">
      <Flex direction="column" marginBottom={30}>
        <Heading fontSize={title_size}>Aversão à perda</Heading>
        <Text fontSize={subtitle_size} color={subtitle_color} marginBottom={5}>
          Para cada uma das opções, selecione aquela que mais se adeque ao seu
          perfil de investidor
        </Text>

        <Heading fontSize={questao_size}>Questão 1.</Heading>
        <Text fontSize={enunciado_size} marginBottom={3} as="b">
          uma moeda é jogada, cara você perde R$3,00. coroa você ganha R$ 6,00.
        </Text>

        <RadioGroup onChange={setValue} value={q1}>
          <Stack direction="column">
            <Stack direction="row">
              <Radio value="1">Aceita a oferta</Radio>
            </Stack>
            <Stack direction="row">
              <Radio value="2">Recusa a oferta</Radio>
            </Stack>
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex direction="column" marginBottom={30}>
        <Heading fontSize={questao_size}>Questão 2.</Heading>
        <Text fontSize={enunciado_size} marginBottom={3} as="b">
          uma moeda é jogada, cara você perde R$4,00. coroa você ganha R$ 6,00.
        </Text>
        <RadioGroup onChange={setValue2} value={q2}>
          <Stack direction="column">
            <Stack direction="row">
              <Radio value="1">Aceita a oferta</Radio>
            </Stack>
            <Stack direction="row">
              <Radio value="2">Recusa a oferta</Radio>
            </Stack>
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex direction="column" marginBottom={30}>
        <Heading fontSize={questao_size}>Questão 3.</Heading>
        <Text fontSize={enunciado_size} marginBottom={3} as="b">
          uma moeda é jogada, cara você perde R$5,00. coroa você ganha R$ 6,00.
        </Text>
        <RadioGroup onChange={setValue3} value={q3}>
          <Stack direction="column">
            <Stack direction="row">
              <Radio value="1">Aceita a oferta</Radio>
            </Stack>
            <Stack direction="row">
              <Radio value="2">Recusa a oferta</Radio>
            </Stack>
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex direction="column" marginBottom={30}>
        <Heading fontSize={questao_size}>Questão 4.</Heading>
        <Text fontSize={enunciado_size} marginBottom={3} as="b">
          uma moeda é jogada, cara você perde R$6,00. coroa você ganha R$ 6,00.
        </Text>
        <RadioGroup onChange={setValue4} value={q4}>
          <Stack direction="column">
            <Stack direction="row">
              <Radio value="1">Aceita a oferta</Radio>
            </Stack>
            <Stack direction="row">
              <Radio value="2">Recusa a oferta</Radio>
            </Stack>
          </Stack>
        </RadioGroup>
      </Flex>
      <Button
        width="100%"
        colorScheme="blue"
        variant="solid"
        size="lg"
        margin={5}
        onClick={() => {
          onSubmit();
        }}
      >
        Próxima
      </Button>
    </Flex>
  );
}
