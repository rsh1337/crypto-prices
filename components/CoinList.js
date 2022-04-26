import {
  Box,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const CoinList = ({ coinsData }) => {
  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Coin</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Max Price(24H)</Th>
            <Th isNumeric>Min Price(24H)</Th>
          </Tr>
        </Thead>
        {coinsData.map(
          ({
            name,
            current_price,
            image,
            id,
            high_24h,
            low_24h,
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
              </Tr>
            </Tbody>
          )
        )}
      </Table>
    </TableContainer>
  );
};
export default CoinList;
