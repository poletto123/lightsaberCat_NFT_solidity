import { useState } from 'react';
import { ethers } from 'hre';
import lightsaberCat from './LightsaberCat.json';

const lightsaberCatAddress = '';

const Mint = ({ accounts, setAccounts }) => {
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
                const response = await contract.mint(BigNumber.from(mintAmount), '1.json');
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
        <div>
            <h1>Edward Bellybottom</h1>
            <p>Introducing Edward Bellybottom. Living in his castle, he contemplates on the smallness of humans, and uses the Force to protect his cat realm</p>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={mintAmount} />
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}>Mint Now</button>
                </div>
            ) : (
                <p>You must be connected to mint</p>
            )}
        </div>
    )
};

export default Mint;