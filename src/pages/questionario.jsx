import { Stack, Flex, Box, Button, Text, Center, Heading } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import logo from '../images/dao.png';
import { useNavigate } from "react-router-dom";
import { RadioGroup, Radio, Stack as Stack2 } from "@chakra-ui/react"
import AversaoRisco from './aversao_risco';
import AversaoPerda from './aversao_perda';
import Reflexao from './reflexao';

import React, { useState, useEffect } from 'react';
export default function Questionario(){
    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, []);
    const [values, setValues] = useState({
        step: 1,
        aversaoRisco: 0,
        aversaoPerda: 0,
        reflexao: 0,
        slr: 0,
    });

    // increment the step
    const nextStep = () => {
        setValues({...values, step: values.step + 1});
    };

    // decrement the step
    const prevStep = () => {
        setValues({...values, step: values.step - 1});
    };

    // handle avesaoRisco change
    const handleAversaoRiscoChange = (input) => {
        setValues({...values, aversaoRisco: input});
    };

    // handle avesaoPerda change
    const handleAversaoPerdaChange = (input) => {
        setValues({...values, aversaoPerda: input});
    };

    // handle reflexao change
    const handleReflexaoChange = (input) => {
        setValues({...values, reflexao: input});
    };

    // handle slr change
    const handleSlrChange = (input) => {
        setValues({...values, slr: input});
    };


    // change the value of a field
    const handleChange = input => e => {
        setValues({...values, [input]: e.target.value});
    };


    

    function renderSwitch(){
        switch(values.step){
            case 1:
                return <AversaoRisco handleChange={handleAversaoRiscoChange} values={values} nextStep={nextStep}/>
            case 2:
                return <AversaoPerda handleChange={handleAversaoPerdaChange} values={values} nextStep={nextStep}/>;
            case 3:
                return <Reflexao handleChange={handleReflexaoChange} values={values} nextStep={nextStep}/>;
            case 4:
                return <div></div>;
            default:
                return <AversaoRisco/>;

    }
}


    // render a flex with a switch that in case values == 0, render AveraoRisco
    return (
        <Flex direction="column" align="center" justify="start" padding={10}>
            {renderSwitch()}
        </Flex>
    );

}