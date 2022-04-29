import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box, Center, CircularProgress, Container, Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import Layout from "../components/Layout";
import { fetcher } from '../utils/api';

function CoinList(){
  const { data, error } = useSWR('/api/coins', fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
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
        {data.map(
          ({
            name,
            current_price,
            image,
            id,
            high_24h,
            low_24h,
            price_change_percentage_24h_in_currency,
          }) => (
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
                <Td isNumeric>
                  {price_change_percentage_24h_in_currency < 0 ? (
                    <Box color="red.500"><TriangleDownIcon /> {price_change_percentage_24h_in_currency.toFixed(2)}%</Box>
                  ) : (
                    <Box color="green.500"><TriangleUpIcon /> {price_change_percentage_24h_in_currency.toFixed(2)}%</Box>
                  )}
                </Td>
              </Tr>
            </Tbody>
          )
        )}
      </Table>
    </TableContainer>
  );
}

export default function Home() {

  return (
    <Layout title="Crypto">
      <Container maxW="container.md">
        <CoinList />
      </Container>
    </Layout>
  );
}
