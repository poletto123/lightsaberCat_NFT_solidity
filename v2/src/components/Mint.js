import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import lightsaberCat from '../LightsaberCat.json';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

const lightsaberCatAddress = '0x93544f7F16bc6648c7da21B6D407A7E1F73C68cf';
const mintPrice = 0.02;

const Mint = ({ accounts, currentCardIndex }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                lightsaberCatAddress,
                lightsaberCat.abi,
                signer
            );
            try {
                let index = currentCardIndex + 1;
                console.log(index.toString() + '.json');
                const response = await contract.mint(BigNumber.from(mintAmount), index.toString() + '.json', {
                    value: ethers.utils.parseEther((mintPrice * mintAmount).toString())
                });
                console.log('response: ', response);
            } catch (err) {
                console.log('error: ', err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify="center" align="center" height="100vh">
            <Box width="520px">
                    {isConnected ? (
                        <div>
                            <Flex align="center" justify="center">
                                <Button
                                    fontSize="30px"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px"
                                    fontFamily="inherit"
                                    cursor="pointer"
                                    padding="15px"
                                    marginTop="10px"
                                    onClick={handleDecrement}>
                                        -
                                    </Button>
                                <Input 
                                    fontSize="30px"
                                    readOnly
                                    fontFamily="inherit"
                                    width="100px"
                                    height="80px"
                                    textAlign="center"
                                    margin="30px"
                                    type="number"
                                    value={mintAmount} />
                                <Button
                                    fontSize="30px"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px"
                                    fontFamily="inherit"
                                    cursor="pointer"
                                    padding="15px"
                                    marginTop="10px"
                                    onClick={handleIncrement}>
                                    +
                                </Button>
                            </Flex>
                            <Button
                                fontSize="30px"
                                backgroundColor="white"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleMint}>
                                    Mint Now
                            </Button>
                        </div>
                    ) : (
                        <Text fontWeight="bold" color="white">You must be connected to mint</Text>
                    )}
            </Box>
        </Flex>
    )
};

export default Mint;