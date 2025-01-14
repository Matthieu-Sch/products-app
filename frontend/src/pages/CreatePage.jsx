// import React from "react";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    console.log("Success : ", success);
    console.log("Message :", message);
    if (!success) {
      toast({
        title: "Erreur",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Succès",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setNewProduct({ name: "", price: "", image: "" });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <Flex flexDir={"column"}>
        <Heading as={"h2"} size={"2xl"} textAlign={"center"} mb={8}>
          Ajouter un nouveau produit
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.700")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <Flex flexDir={"column"} gap={5}>
            <Input
              placeholder="Nom du produit"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Prix du produit"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="URL de l'image du produit"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <VStack>
              <Button onClick={() => handleAddProduct()} w={"full"}>
                Ajouter le produit
              </Button>

              <Button w={"full"}>
                <Link
                  to={"/"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  Accueil
                </Link>
              </Button>
            </VStack>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default CreatePage;
