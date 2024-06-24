import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Text, Box, Image, Heading, Button } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEmployees } from "../contexts/EmployeeContext";

const EmployeeDetails = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const { employees, favorites, setFavorites } = useEmployees();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!favorites || !employees) {
      setLoading(true);
      return;
    }

    const employeeFromFavorites = favorites.find(emp => emp.login.uuid === uuid);
    const employeeFromAllEmployees = employees.find(emp => emp.login.uuid === uuid);

    if (employeeFromFavorites || employeeFromAllEmployees) {
      setError(''); // Clear any previous errors
      setEmployee(employeeFromFavorites || employeeFromAllEmployees);
    } else {
      console.error("Employee not found");
      setError("Employee not found. Please try again.");
    }
    setLoading(false);
  }, [uuid, employees, favorites]);

  if (loading) {
    return (
      <Container centerContent maxW="container.md" py={10}>
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent maxW="container.md" py={10}>
        <Text>{error}</Text>
        <Button onClick={() => navigate(-1)} colorScheme="blue">Go Back</Button>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" py={10}>
      <Box width="100%" p={4} borderWidth={1} borderRadius="md" mb={4}>
        <Button onClick={() => navigate(-1)} colorScheme="blue" mb={4}>Go Back</Button>
        <Heading as="h2" size="lg" mb={4}>Employee Details</Heading>
        <Image src={employee.picture.large} alt={employee.name.first} borderRadius="full" boxSize="150px" mb={4} />
        <Text fontWeight="bold">{`${employee.name.first} ${employee.name.last}`}</Text>
        <Text>{`Email: ${employee.email}`}</Text>
        <Text>{`Phone: ${employee.phone}`}</Text>
        <Text>{`Address: ${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.country}, ${employee.location.postcode}`}</Text>
        <Button onClick={() => favorites.some(fav => fav.login.uuid === employee.login.uuid) ? setFavorites(favorites.filter(fav => fav.login.uuid !== employee.login.uuid)) : setFavorites([...favorites, employee])} leftIcon={<FaStar />} colorScheme="yellow" variant="outline">
          {favorites.some(fav => fav.login.uuid === employee.login.uuid) ? "Unfavorite" : "Favorite"}
        </Button>
        <Box height="400px" width="100%" mt={4}>
          <MapContainer
            center={[parseFloat(employee.location.coordinates.latitude), parseFloat(employee.location.coordinates.longitude)]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[parseFloat(employee.location.coordinates.latitude), parseFloat(employee.location.coordinates.longitude)]}>
              <Popup>
                {`${employee.name.first} ${employee.name.last}`}
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default EmployeeDetails;