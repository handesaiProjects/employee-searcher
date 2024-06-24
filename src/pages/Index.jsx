import { useState, useEffect } from "react";
import { Container, Text, VStack, Input, Button, Box, Image, Flex, Link, Heading } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaStar, FaInfoCircle } from "react-icons/fa";
import { useEmployees } from "../contexts/EmployeeContext";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { employees, setEmployees, favorites, setFavorites, addToFavorites, removeFromFavorites } = useEmployees();

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://randomuser.me/api/?results=10&seed=${searchTerm}`);
      const data = await response.json();
      if (response.ok && data.results && data.results.length > 0) {
        setEmployees(data.results);
        localStorage.setItem("allEmployees", JSON.stringify(data.results));
      } else {
        alert("No results found for the search term.");
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      alert("Failed to fetch employee data. Please try again.");
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" mb={6}>Employee Search</Heading>
        <Input
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch} colorScheme="blue">Search</Button>
        <Box width="100%">
          {employees.map((employee) => (
            <Flex key={employee.login.uuid} p={4} borderWidth={1} borderRadius="md" mb={4} alignItems="center">
              <Image src={employee.picture.thumbnail} alt={employee.name.first} borderRadius="full" boxSize="50px" />
              <Box ml={4}>
                <Text fontWeight="bold">{`${employee.name.first} ${employee.name.last}`}</Text>
                <Text>{`Age: ${employee.dob.age}`}</Text>
                <Text>{`${employee.location.city}, ${employee.location.country}`}</Text>
              </Box>
              <Button ml="auto" onClick={() => favorites.some(fav => fav.login.uuid === employee.login.uuid) ? removeFromFavorites(employee) : addToFavorites(employee)} leftIcon={<FaStar />} colorScheme="yellow" variant="outline">
                {favorites.some(fav => fav.login.uuid === employee.login.uuid) ? "Unfavorite" : "Favorite"}
              </Button>
              <Link as={RouterLink} to={`/details/${employee.login.uuid}`} ml={2} color="blue.500"><FaInfoCircle /></Link>
            </Flex>
          ))}
        </Box>
        <Link as={RouterLink} to="/favorites" color="blue.500">View Favorites</Link>
      </VStack>
    </Container>
  );
};

export default Index;