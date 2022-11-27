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
import { useLocation,useParams } from "react-router-dom";
import { Chart } from "react-google-charts";
var randomColor = require('randomcolor'); // import the script

export default function Portfolio(props) {

    const params = useParams();

    const portfolio_id = params.id;

    const navigate = useNavigate();
    
    useEffect(() => {
        if(portfolio_id != undefined && ativos.length == 0){
            api.get('/status/', {
                params: {
                    id: portfolio_id,
                }
            },).then((response) => {
                console.log(response.data);
                if( response.status == 200){
                    if (response.data.status == "finished"){
                setAtivos(response.data.portfolio);
                    }
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [])

    const [ativos, setAtivos] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [ativosPosProcessamento, setAtivosPosProcessamento] = useState([["Portfolio","%"]]);


    const isFirstRender = useRef(true);

    useEffect(() => {
        
            // 👇️ scroll to top on page load
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        
            if(ativos.length > 0 && ativosPosProcessamento.length == 1){
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

    <Button width="100%" colorScheme="blue" variant="solid" size="lg" margin={5} onClick={() => navigate('/')}>Refazer questionário</Button>



            
        </Flex>
    )

}
