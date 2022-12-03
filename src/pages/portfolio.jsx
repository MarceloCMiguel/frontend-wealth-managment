import {
  Stack,
  Flex,
  Box,
  Button,
  Text,
  Center,
  Heading,
  Input,
  StackDivider,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import logo from "../images/dao.png";
import { useNavigate } from "react-router-dom";
import { RadioGroup, Radio, Stack as Stack2 } from "@chakra-ui/react";
import { React, useState } from "react";
import { blue_color, title_size } from "../styles/pallete_color";
import { subtitle_size } from "../styles/pallete_color";
import { subtitle_color } from "../styles/pallete_color";
import { enunciado_size } from "../styles/pallete_color";
import { questao_size } from "../styles/pallete_color";
import { title_color } from "../styles/pallete_color";
import { useEffect } from "react";
import api from "../api/api";
import { useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Chart } from "react-google-charts";
var randomColor = require("randomcolor"); // import the script

export default function Portfolio(props) {
  const params = useParams();

  const portfolio_id = params.id;

  const navigate = useNavigate();

  const [graphData, setGraphData] = useState(null);

  const [portfolioAttribute, setPortfolioAttribute] = useState(null);

  useEffect(() => {
    if (portfolio_id != undefined && ativos.length == 0) {
      api
        .get("/status/", {
          params: {
            id: portfolio_id,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            if (response.data.status == "finished") {
              setAtivos(response.data.portfolio);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (portfolio_id != undefined && graphData == null) {
      api
        .get("graph/user", {
          params: {
            id: portfolio_id,
          },
        })
        .then((response) => {
          if (response.status == 200 || response.status == 202) {
            var copy_response = response.data;
            var datas = copy_response["datas"]; // eixo x
            delete copy_response["datas"];
            var keys = Object.keys(copy_response);
            var values = Object.values(copy_response);
            var ListData = [];
            var header = ["x"];
            header.push(...keys);
            ListData.push(header);
            // get the length of the minor list of values
            let menor = values[0].length;
            values.map((value) => {
              if (value.length < menor) {
                menor = value.length;
              }
            });
            for (let i = 0; i < menor; i++) {
              var list = [];
              list.push(datas[i]);
              for (let j = 0; j < values.length; j++) {
                list.push(values[j][i] - 100);
              }
              ListData.push(list);
            }
            setGraphData(ListData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (portfolio_id != undefined && portfolioAttribute == null) {
      api
        .get("/atributes/user/", {
          params: {
            id: portfolio_id,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            setPortfolioAttribute(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const [ativos, setAtivos] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [ativosPosProcessamento, setAtivosPosProcessamento] = useState([
    ["Portfolio", "%"],
  ]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    if (ativos.length > 0 && ativosPosProcessamento.length == 1) {
      var ativosPesos = [];
      var size_each_ativo = 100 / ativos.length;
      for (var i = 0; i < ativos.length; i++) {
        ativosPesos.push([ativos[i], size_each_ativo]);
      }

      // append ativosPesos to ativosPosProcessamento
      setAtivosPosProcessamento([...ativosPosProcessamento, ...ativosPesos]);
      return;
    }
  }, [ativos]);

  const options = {
    // make legend on bottom
    legend: { position: "top", maxLines: 5 },
  };

  const LineChartOptions = {
    legend: { position: "top", maxLines: 5 },
    hAxis: {
      title: "Data",
    },
    vAxis: {
      title: "Evolução Patrimonial (%)",
    },
  };

  const formatNumber = (number) => {
    // round and show 2 decimals
    return (Math.round(number * 100) / 100).toFixed(2);
  };

  return (
    // add a Flex tag with a direction of column, centered in axis y
    <Flex direction="column" align="center" justify="start" padding={10}>
      <Image src={logo} alt="logo" />
      <Flex direction="column" align="start" justify="start">
        <Heading fontSize={title_size} color={blue_color}>
          Seus investimentos
        </Heading>
      </Flex>

      {ativosPosProcessamento.length <= 1 ? (
        <p>Carregando Portfolio</p>
      ) : (
        <Chart
          chartType="PieChart"
          data={ativosPosProcessamento}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      )}
      <Box margin={2} />

      <Heading fontSize={title_size} color={blue_color}>
        Evolução patrimonial
      </Heading>

      {graphData != null ? (
        <Chart
          width={"98vw"}
          height={"410px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={graphData}
          options={LineChartOptions}
          rootProps={{ "data-testid": "2" }}
        />
      ) : (
        <div> Carregando evolução patrimonial</div>
      )}
      <Box margin={5} />
      <Heading fontSize={title_size} color={blue_color}>
        Atributos
      </Heading>
      {portfolioAttribute != null ? (
        <Card>
          <CardHeader>
            <Heading size="md">Características do Portfólio</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Retorno (%)
                </Heading>
                <Text pt="2" fontSize="sm" color={blue_color}>
                  {formatNumber(portfolioAttribute["retorno"])}%
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Volatilidade (%)
                </Heading>
                <Text pt="2" fontSize="sm" color={blue_color}>
                  {formatNumber(portfolioAttribute["volatilidade"])}%
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Skewness (por ativo)
                </Heading>
                <Text pt="2" fontSize="sm">
                  {Object.entries(portfolioAttribute["skew"]).map(
                    ([key, value]) => (
                      <Text color={blue_color}>
                        {key}: {formatNumber(value)}
                      </Text>
                    )
                  )}
                </Text>
              </Box>

              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Kurtosis (por ativo)
                </Heading>
                <Text pt="2" fontSize="sm">
                  {Object.entries(portfolioAttribute["kurtosis"]).map(
                    ([key, value]) => (
                      <Text color={blue_color}>
                        {key}: {formatNumber(value)}
                      </Text>
                    )
                  )}
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      ) : (
        // <div>
        //   <p>Retorno médio anual: {portfolioAttribute["retorno"]}%</p>
        //   <p>Volatilidade: {portfolioAttribute["volatilidade"]}</p>
        //   {Object.keys(portfolioAttribute["skew"]).map((key) => {
        //     return (
        //       <p>
        //         {key}: {portfolioAttribute["skew"][key]}
        //       </p>
        //     );
        //   })}
        // </div>
        <div> Carregando atributos do portfolio</div>
      )}

      <Button
        width="100%"
        colorScheme="blue"
        variant="solid"
        size="lg"
        margin={5}
        onClick={() => navigate("/")}
      >
        Refazer questionário
      </Button>
    </Flex>
  );
}
