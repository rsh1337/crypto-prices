import { Box, Container, HStack, Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";

const CoinList = ({ coinsData }) => {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Coin</Th>
            <Th isNumeric>Price</Th>
          </Tr>
        </Thead>
        {coinsData.map(({ name, current_price, image, id }) => (
          <Tbody key={id}>
            <Tr>
              <Td><Image borderRadius="full" boxSize="50px" src={image} alt={name} />
              <Box>{name}</Box></Td>
              <Td isNumeric><Box>${current_price}</Box></Td>
            </Tr>
          </Tbody>
    ))}
      </Table>
    </TableContainer>
  );
};
export default CoinList;
