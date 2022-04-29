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

  if (!data.coins.length) {
    return <Text>No results</Text>;
  }

  return (
    <TableContainer>
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Coin</Th>
          <Th>Symbol</Th>
        </Tr>
      </Thead>
      {data.coins.map(({ name, id, large, symbol}) => (
          <Tbody key={id}>
            <Tr>
              <Td>
                <Image
                  borderRadius="full"
                  boxSize="50px"
                  src={large}
                  alt={name}
                />
                <Box mt={2}>{name}</Box>
              </Td>
              <Td>
                  <Box>{symbol}</Box>
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
