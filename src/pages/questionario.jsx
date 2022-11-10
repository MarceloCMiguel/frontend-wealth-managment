import { Stack, Flex, Box, Button, Text, Center, Heading } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import logo from '../images/dao.png';
import { useNavigate } from "react-router-dom";
import { RadioGroup, Radio, Stack as Stack2 } from "@chakra-ui/react"
import AversaoRisco from './aversao_risco';
import AversaoPerda from './aversao_perda';
import Reflexao from './reflexao';

import React, { useState } from 'react';
export default function Questionario(){

    const [value, setValue] = useState(0);

    

    function renderSwitch(){
        console.log("oi");
        switch(value){
            case 1:
                return <AversaoRisco/>;
            case 2:
                return <AversaoPerda/>;
            case 3:
                return <Reflexao/>;
            case 4:
                return <div></div>;
            default:
                return <AversaoRisco/>;

    }
}


    // render a flex with a switch that in case value == 0, render AveraoRisco
    return (
        <Flex direction="column" align="center" justify="start" padding={10}>
            {renderSwitch()}
        </Flex>
    );

}