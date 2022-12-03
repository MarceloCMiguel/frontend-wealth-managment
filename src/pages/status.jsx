import {
  Stack,
  Flex,
  Box,
  Button,
  Text,
  Center,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import logo from "../images/dao.png";
import { useNavigate } from "react-router-dom";
import { RadioGroup, Radio, Stack as Stack2 } from "@chakra-ui/react";
import { React, useState } from "react";
import { blue_color, title_size } from "../styles/pallete_color";
import { subtitle_size } from "../styles/pallete_color";
import { subtitle_color } from "../styles/pallete_color";
import { useEffect } from "react";
import api from "../api/api";
import { useRef } from "react";
import { useParams } from "react-router-dom";

export default function StatusPage(props) {
  const navigate = useNavigate();
  const params = useParams();

  const id = params.id;
  const isFirstRender = useRef(true);
  const [status, setStatus] = useState("Carregando...");

  useEffect(() => {
    if (id != "" && status != "finished") {
      const interval = setInterval(() => {
        api
          .get("/status/", {
            params: {
              id: id,
            },
          })
          .then((response) => {
            if (response.status == 200) {
              if (response.data.status != status) {
                setStatus(response.data.status);
              }
              if (response.data.status == "finished") {
                clearInterval(interval);
                navigate("/portfolio/" + id);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [id, status]);
  return (
    // add a Flex tag with a direction of column, centered in axis y
    <Flex direction="column" align="center" justify="start">
      <Flex direction="column" align="start" marginBottom={30}>
        <Heading fontSize={title_size}>Calculando o Portfolio</Heading>
        <Text fontSize={subtitle_size} color={subtitle_color}>
          A ferramenta está calculando os melhores ativos baseados no seu perfil
        </Text>
      </Flex>
      <Heading fontSize={title_size}>Status do Portfolio:</Heading>

      <Text color={blue_color} fontSize={title_size}>
        {status}
      </Text>
      <Text fontSize={subtitle_size}>
        Assim que sua carteira de investimento for criada, será redirecionado
        para a tela de investidor
      </Text>
    </Flex>
  );
}
