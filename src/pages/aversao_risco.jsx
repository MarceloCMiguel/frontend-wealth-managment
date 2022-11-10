import { Stack, Flex, Box, Button, Text, Center, Heading } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import logo from '../images/dao.png';
import { useNavigate } from "react-router-dom";
import { RadioGroup, Radio, Stack as Stack2 } from "@chakra-ui/react"
import {React, useState} from 'react';

export default function AversaoRisco(){
    const [value, setValue] = useState('1');

        return(
            // add a Flex tag with a direction of column, centered in axis y
            <Flex direction="column" align="start" justify="start">
                <Heading>Questão 1</Heading>
               <RadioGroup onChange={setValue} value={value}>
      <Stack direction='column'>
        <Stack direction='row'>
            <Radio value="1">50% de chance de ganhar R$2.00, 50% de chance de ganhar R$1,60.</Radio>
            
        </Stack>
        <Stack direction='row'>
            <Radio value="2">50% de chance de ganhar R$3.85, 50% de chance de ganhar R$0,10.</Radio>
            </Stack>
      </Stack>
    </RadioGroup> 

                </Flex>
        )
    }
