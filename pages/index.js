import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box, Center, CircularProgress, Container, Image, Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import Layout from "../components/Layout";
import { fetcher } from '../utils/api';

function CoinList(){
  const IMAGES_API = "https://assets.coincap.io/assets/icons/";
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
            <Th isNumeric>Change(24H)</Th>
          </Tr>
        </Thead>
        {data.data.map(
          ({
            id,
            symbol,
            name,
            priceUsd,
            changePercent24Hr,
            rank
          }) => (
               <Tbody key={id}>
              <Tr>
                <Td>
                <Link href={`/coins/${id}`} passHref>
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src={IMAGES_API + `${symbol.toLowerCase()}@2x.png`}
                    alt={name}
                  />
                  <Box mt={2}>{name}</Box>
                  </Link>
                </Td>
                <Td isNumeric>
                <Link href={`/coins/${id}`} passHref>
                  <Box>${priceUsd.slice(0, 7)}</Box>
                  </Link>
                </Td>
                <Td isNumeric>
                <Link href={`/coins/${id}`} passHref>
                  {changePercent24Hr < 0 ? (
                    <Box color="red.500"><TriangleDownIcon /> {changePercent24Hr.slice(0, 5)}%</Box>
                  ) : (
                    <Box color="green.500"><TriangleUpIcon /> {changePercent24Hr.slice(0, 5)}%</Box>
                  )}
                  </Link>
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
