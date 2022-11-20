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

export default function StatusPage(props) {
    const navigate = useNavigate();
    const isFirstRender = useRef(true);
    const [status, setStatus] = useState('Carregando...');
    const [id, setId] = useState('');
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false // toggle flag after first render/mounting
            api.get('/ativos/user/', {
                params: {
                    risk_aversion_loss: props.values.aversaoPerda,
                    risk_aversion_risk: props.values.aversaoRisco,
                    reflection: props.values.reflexao,
                    total_assets: props.values.total_assets,
                    liabilities: props.values.liabilities,

                }
            },).then((response) => {
                setStatus(response.data.status);
                setId(response.data.id);    
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }



    }, [])

    
    useEffect(() => {
        if(id != '' && status != "finished"){
        const interval = setInterval(() => {
            api.get('/status/', {
                params: {
                    id: id,
                }
            },).then((response) => {
                
                if( response.status == 200){
                    if(response.data.status != status){
                        setStatus(response.data.status);
                    }
                    if (response.data.status == "finished"){
                        var portfolio = response.data.portfolio;
                        clearInterval(interval);
                        navigate("/portfolio", { state: { id: id, portfolio: portfolio} });
                    }
                }
            }).catch((error) => {
                console.log(error);
            });
        }, 2000);
        return () => clearInterval(interval);
    }
    }, [id, status]);
    return (
        // add a Flex tag with a direction of column, centered in axis y
        <Flex direction="column" align="center" justify="start">

            <Flex direction="column" align="start" marginBottom={30}>
                <Heading fontSize={title_size}>Calculando o Portfolio</Heading>
                <Text fontSize={subtitle_size} color={subtitle_color} >A ferramenta está calculando os melhores ativos baseados no seu perfil</Text>
            </Flex>
            <Heading fontSize={title_size}>Status do Portfolio:
            </Heading>
            
            <Text color={blue_color} fontSize={title_size} >{status} {props.values[0]}</Text>
            <Text fontSize={subtitle_size} >Assim que sua carteira de investimento for criada, será redirecionado para a tela de investidor</Text>
            


        </Flex>
    )

}
