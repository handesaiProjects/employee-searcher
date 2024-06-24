import { useState, useEffect } from "react";
import { Container, Text, Box, Image, Flex, Link, Heading, VStack, Button } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { useEmployees } from "../contexts/EmployeeContext";

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites } = useEmployees();

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" mb={6}>Favorite Employees</Heading>
        <Button onClick={() => navigate(-1)} colorScheme="blue" mb={4}>Go Back</Button>
        <Box width="100%">
          {favorites.length > 0 ? (
            favorites.map((employee, index) => (
              <Flex key={employee.login.uuid} p={4} borderWidth={1} borderRadius="md" mb={4} alignItems="center">
                <Image src={employee.picture.thumbnail} alt={employee.name.first} borderRadius="full" boxSize="50px" />
                <Box ml={4}>
                  <Text fontWeight="bold">{`${employee.name.first} ${employee.name.last}`}</Text>
                  <Text>{`Age: ${employee.dob.age}`}</Text>
                  <Text>{`${employee.location.city}, ${employee.location.country}`}</Text>
                </Box>
                <Link as={RouterLink} to={`/details/${employee.login.uuid}`} ml="auto" color="blue.500" display="flex" alignItems="center">
                  <FaInfoCircle />
                  <Text ml={2}>More Details</Text>
                </Link>
              </Flex>
            ))
          ) : (
            <Text>No favorite employees added yet.</Text>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Favorites;