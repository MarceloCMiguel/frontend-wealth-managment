import { Stack, Flex, Box, Button, Text, Center, Heading, Input } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import logo from '../images/dao.png';
import { useNavigate } from "react-router-dom";
import { RadioGroup, Radio, Stack as Stack2 } from "@chakra-ui/react"
import { React, useState } from 'react';
import { blue_color, title_size } from '../styles/pallete_color';
import { subtitle_size } from '../styles/pallete_color';
import { subtitle_color } from '../styles/pallete_color';
import { enunciado_size } from '../styles/pallete_color';
import { questao_size } from '../styles/pallete_color';
import { title_color } from '../styles/pallete_color';
import { useEffect } from 'react';
import api from '../api/api';
import { useRef } from 'react';
import { useLocation } from "react-router-dom";
import { Chart } from "react-google-charts";
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
var randomColor = require('randomcolor'); // import the script
// ChartJS.register(ArcElement, Tooltip, Legend);

export default function Portfolio(props) {



    const navigate = useNavigate();
    const location = useLocation();
    const [ativos, setAtivos] = useState({
        'PETR4': 25,
        'VALE3': 25,
        'ITUB4': 25,
        'BBDC4': 25,

    });

    const [isLoading, setIsLoading] = useState(true);

    const [ativosPosProcessamento, setAtivosPosProcessamento] = useState([["Portfolio","%"]]);


    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            // 👇️ scroll to top on page load
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

            // // set a list with the keys of the ativos object to setLabels
            // var labels = Object.keys(ativos);
            // // add labels to key labels in data
            // // setData({ ...data, labels: labels });

            // // set a list with the values of the ativos object
            // // setData[0].data = Object.values(ativos);
            // var values = Object.values(ativos);
            // console.log(values);

            // // add values to key dataset in data
            // // setData({ ...data, dataset: [{ ...data.dataset[0], data: values }] });
            // // for each Object.values(ativos) create a random color

            // var colors = Object.values(ativos).map(() => randomColor());
            // // add colors to key backgroundColor in dataset
            // setData({ ...data, labels: labels, dataset: [{ ...data.dataset[0], backgroundColor: colors, data: values }] });
            // append a list with the keys and values of the ativos object to ativosPosProcessamento
            // setAtivosPosProcessamento(...ativosPosProcessamento, ativos.map((key, value) => [key, value]));

            // for each key value pair in ativos, append a list with the key and value to ativosPosProcessamento
            var ativosPesos = [];
            Object.entries(ativos).forEach(([key, value]) => {
                ativosPesos.push([key, value]);
            });
            // append ativosPesos to ativosPosProcessamento
            setAtivosPosProcessamento([...ativosPosProcessamento, ...ativosPesos]);
            
            return;
        }
        setIsLoading(false);
        // console.log(data);
    }, []);


    const dataOptions = [
        ["Portfolio", "%"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
      ];
      
       const options = {

        // make legend on bottom
        legend: { position: "top",maxLines: 5 },

      };

    return (
        // add a Flex tag with a direction of column, centered in axis y
        <Flex direction="column" align="center" justify="start" padding={10}>
            <Image src={logo} alt="logo" />
            <Flex direction="column" align="start" justify="start">
                <Heading fontSize={title_size} color={blue_color}>Seus investimentos</Heading>
            </Flex>
            <Chart
      chartType="PieChart"
      data={ativosPosProcessamento}
      options={options}
      width={"100%"}
      height={"400px"}
    />




            
        </Flex>
    )

}
