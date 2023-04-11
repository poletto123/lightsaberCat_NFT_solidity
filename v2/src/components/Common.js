import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';

const Common = () => {

  return (
    <Flex justify="center" align="center" width="80%" margin="0 auto" borderStyle="solid" borderRadius="20px">
        <Box width="99%" borderRadius="20px" backgroundColor="#00022C" >
            <Text fontSize="30px">Lightsaber Cat NFT</Text>
            <Text fontSize="20px">Living in his castle, he contemplates on the smallness of humans, and uses the Force to protect his cat realm</Text>
        </Box>
    </Flex>
  )
}

export default Common;
