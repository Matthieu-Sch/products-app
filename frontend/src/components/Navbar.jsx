import { Button, Container, Flex, Text, useColorMode } from "@chakra-ui/react";
import { CiSquarePlus } from "react-icons/ci";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
// import React from "react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} py={"25px"} px={4} mb={{ base: "35px" }}>
      <Flex
        h={"16px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Products App</Link>
        </Text>

        <Flex gap={5}>
          <Link to={"/create"}>
            <Button colorScheme="pink" fontSize={30}>
              <CiSquarePlus />
            </Button>
          </Link>
          <Button onClick={toggleColorMode} colorScheme="purple" fontSize={24}>
            {colorMode === "light" ? <IoMoonOutline /> : <IoSunnyOutline />}
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
