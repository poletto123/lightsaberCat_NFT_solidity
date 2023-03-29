import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import lightsaberCat from '../LightsaberCat.json';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

const lightsaberCatAddress = '0xD1ADeC606Ea9BE252C38357a9A04767163E41553';
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
        <Flex justify="center" align="center" height="50vh">
            <Box width="520px" >
                    {isConnected ? (
                        <div>
                            <Flex align="center" justify="center">
                                <Button
                                    fontSize="20px"
                                    width="60px"
                                    height="60px"
                                    borderRadius="50px"
                                    fontFamily="inherit"
                                    cursor="pointer"
                                    padding="15px"
                                    marginTop="10px"
                                    boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
                                    onClick={handleDecrement}>
                                        -
                                    </Button>
                                <Input 
                                    fontSize="20px"
                                    borderRadius="50px"
                                    readOnly
                                    fontFamily="inherit"
                                    width="60px"
                                    height="60px"
                                    textAlign="center"
                                    margin="30px"
                                    type="number"
                                    boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
                                    value={mintAmount} />
                                <Button
                                    fontSize="20px"
                                    width="60px"
                                    height="60px"
                                    borderRadius="50px"
                                    fontFamily="inherit"
                                    cursor="pointer"
                                    padding="15px"
                                    marginTop="10px"
                                    boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
                                    onClick={handleIncrement}>
                                    +
                                </Button>
                            </Flex>
                            <Button
                                fontSize="30px"
                                backgroundColor="white"
                                borderRadius="5px"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                // margin="0"
                                boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
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