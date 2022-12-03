import {
  Stack,
  Flex,
  Box,
  Button,
  Text,
  Center,
  Heading,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import logo from "../images/dao.png";
import { useNavigate, useLocation } from "react-router-dom";
import { RadioGroup, Radio, Stack as Stack2 } from "@chakra-ui/react";
import AversaoRisco from "./aversao_risco";
import AversaoPerda from "./aversao_perda";
import Reflexao from "./reflexao";

import React, { useState, useEffect, useRef } from "react";
import SLR from "./slr";
import StatusPage from "./status";
import api from "../api/api";
export default function Questionario() {
  const navigate = useNavigate();
  const location = useLocation();

  const [values, setValues] = useState({
    step: 1,
    aversaoRisco: -1,
    aversaoPerda: -1,
    reflexao: -1,
    total_assets: -1,
    liabilities: -1,
    name: "",
    email: "",
  });
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      if (!location.state) {
        return navigate("/");
      } else {
        // set value of name and email
        setValues({
          ...values,
          name: location.state.name,
          email: location.state.email,
        });
      }
      isFirstRender.current = false; // toggle flag after first render/mounting
      return;
    }

    if (values.aversaoRisco != -1 && values.step == 1) {
      setValues({ ...values, step: 2 });
    } else if (values.aversaoPerda != -1 && values.step == 2) {
      setValues({ ...values, step: 3 });
    } else if (values.reflexao != -1 && values.step == 3) {
      setValues({ ...values, step: 4 });
    } else if (
      values.total_assets != -1 &&
      values.step == 4 &&
      values.liabilities != -1
    ) {
      api
        .post("/ativos/user/", {
          risk_aversion_loss: values.aversaoPerda,
          risk_aversion_risk: values.aversaoRisco,
          reflection: values.reflexao,
          total_assets: values.total_assets,
          liabilities: values.liabilities,
          name: values.name,
          email: values.email,
        })
        .then((response) => {
          var status_id = response.data.id;

          navigate("/status/" + status_id);
        })
        .catch((error) => {
          console.log(error);
        });
      // setValues({...values, step: 5});
    }
  }, [values]);

  // increment the step
  const nextStep = () => {
    setValues({ ...values, step: values.step + 1 });
  };

  // decrement the step
  const prevStep = () => {
    setValues({ ...values, step: values.step - 1 });
  };

  // handle avesaoRisco change
  const handleAversaoRiscoChange = (input) => {
    setValues({ ...values, aversaoRisco: input });
    // nextStep();
  };

  // handle avesaoPerda change
  const handleAversaoPerdaChange = (input) => {
    setValues({ ...values, aversaoPerda: input });
  };

  // handle reflexao change
  const handleReflexaoChange = (input) => {
    setValues({ ...values, reflexao: input });
  };

  // handle slr change (receive and change total_assets and liabilities)
  const handleSLRChange = (input) => {
    setValues({ ...values, total_assets: input[0], liabilities: input[1] });
  };
  // handle total_assets change
  const handleTotalAssetsChange = (input) => {
    setValues({ ...values, total_assets: input });
  };

  // handle liabilities change
  const handleLiabilitiesChange = (input) => {
    setValues({ ...values, liabilities: input });
  };

  // change the value of a field
  const handleChange = (input) => (e) => {
    setValues({ ...values, [input]: e.target.value });
  };

  function renderSwitch() {
    switch (values.step) {
      case 1:
        return (
          <AversaoRisco
            handleChange={handleAversaoRiscoChange}
            values={values}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <AversaoPerda
            handleChange={handleAversaoPerdaChange}
            values={values}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <Reflexao
            handleChange={handleReflexaoChange}
            values={values}
            nextStep={nextStep}
          />
        );
      case 4:
        return (
          <SLR
            handleChange={handleSLRChange}
            values={values}
            nextStep={nextStep}
          />
        );
      case 5:
        return <StatusPage values={values} />;
    }
  }

  // render a flex with a switch that in case values == 0, render AveraoRisco
  return (
    <Flex direction="column" align="center" justify="start" padding={10}>
      <Image src={logo} alt="logo" />
      {renderSwitch()}
    </Flex>
  );
}
