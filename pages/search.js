import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box, Container, Image, Progress, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../components/Layout";

function SearchResults() {
  const { terms } = useRouter().query;
  const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);

  if (!terms) {
    return <Text>Type some terms and submit for a quick search</Text>;
  }
  if (error) {
    return (
      <Text color="red">
        Error fetching coins for {terms}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }

  return (
    <TableContainer>
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Coin</Th>
          <Th isNumeric>Price</Th>
          <Th isNumeric>Max Price(24H)</Th>
          <Th isNumeric>Min Price(24H)</Th>
          <Th isNumeric>Change(24H)</Th>
        </Tr>
      </Thead>
      {data.coins.map(({ name, current_price, image, id, high_24h, low_24h, price_change_percentage_24h_in_currency,}) => (
          <Tbody key={id}>
            <Tr>
              <Td>
                <Image
                  borderRadius="full"
                  boxSize="50px"
                  src={image}
                  alt={name}
                />
                <Box mt={2}>{name}</Box>
              </Td>
              <Td isNumeric>
                <Box>${current_price}</Box>
              </Td>
              <Td isNumeric>
                <Box>${high_24h}</Box>
              </Td>
              <Td isNumeric>
                <Box>${low_24h}</Box>
              </Td>
            </Tr>
          </Tbody>
        )
      )}
    </Table>
  </TableContainer>
  );
}

export default function Search() {
  return (
    <Layout title="Search">
      <Container>
        <VStack spacing={4} align="stretch">
          <SearchResults />
        </VStack>
      </Container>
    </Layout>
  );
}
