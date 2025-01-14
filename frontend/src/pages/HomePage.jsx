// import React from "react";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";

const HomePage = () => {
  const { getAllProducts, products } = useProductStore();
  console.log(products);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);
  return (
    <Container maxW={"container.xl"} pb={6}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          mb={4}
        >
          Tous les produits
        </Text>
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid>
      {products.length === 0 && (
        <Text textAlign={"center"}>
          Il n'y a aucun produit. Ajoutez-en un en{" "}
          <Link to={"/create"}>
            <Text
              as={"span"}
              color={"red"}
              _hover={{ textDecoration: "underline" }}
            >
              cliquant ici
            </Text>
          </Link>
        </Text>
      )}
    </Container>
  );
};

export default HomePage;
