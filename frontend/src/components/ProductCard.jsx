import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
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
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    if (!success) {
      toast({
        title: "Erreur",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      onClose();
      toast({
        title: "Succès",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Card
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        transition="all 0.3s"
      >
        <CardBody>
          <Image src={product.image} alt={product.name} borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{product.name}</Heading>
            <Text color="blue.600" fontSize="2xl">
              {product.price}€
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={onOpen}>
              <FaRegEdit />
            </Button>

            <Button
              onClick={() => handleDeleteProduct(product._id)}
              variant="solid"
              colorScheme="red"
            >
              <IoTrash />
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modifier un produit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nom</FormLabel>
              <Input
                placeholder="Nom du produit"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Prix</FormLabel>
              <Input
                placeholder="Prix du produit"
                name="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                placeholder="URL de l'image"
                name="name"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Sauvegarder
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;
