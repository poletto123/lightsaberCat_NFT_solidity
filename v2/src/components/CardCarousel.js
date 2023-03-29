import { useState, useEffect } from "react";
import { Box, Flex, IconButton, Text, Image } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import FirstImage from '../assets/1.png';
import SecondImage from '../assets/2.png';
import ThirdImage from '../assets/3.png';

const cards = [
  {
    id: 1,
    name: "Edward Bellybottom",
    attribute1: "Power: 9",
    attribute2: "Diplomacy: 2",
    attribute3: "Strategy: 4",
    imageFile: FirstImage
  },
  {
    id: 2,
    name: "Charles Catnip",
    attribute1: "Power: 3",
    attribute2: "Diplomacy: 9",
    attribute3: "Strategy: 4",
    imageFile: SecondImage
  },
  {
    id: 3,
    name: "James O'My",
    attribute1: "Power: 6",
    attribute2: "Diplomacy: 6",
    attribute3: "Strategy: 9",
    imageFile: ThirdImage
  },
];

const Card = ({ name, attribute1, attribute2, attribute3, imageFile, visible }) => {
  const [opacity, setOpacity] = useState(visible ? 1 : 0);

  useEffect(() => {
    setOpacity(visible ? 1 : 0);
  }, [visible]);

  const handleTransitionEnd = () => {
    if (!visible) {
      setOpacity(0);
    }
  };

  return (
    <Box
      position="absolute"
      width="100%"
      // height="50%"
      top="0"
      left="0"
      opacity={opacity}
      transition="opacity 0.5s ease"
      onTransitionEnd={handleTransitionEnd}
      backgroundColor="#00022C"
      borderRadius="20px"
      marginTop="20px"
      borderStyle="solid"
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="40%"
      >
        <Text margin="20px" fontSize="30px" textShadow="0 px #00000">
          {name}
        </Text>
        <Image src={imageFile} boxSize="60%" borderRadius="30px"/>
          <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            height="10%"
            margin="20px"
          >
            <Text
              fontSize="20px"
              letterSpacing="-5.5%"
              fontFamily="inherit"
              margin="0 15px 0 15px"
            >
              {attribute1}
            </Text>
            <Text
              fontSize="20px"
              letterSpacing="-5.5%"
              fontFamily="inherit"
              margin="0 15px 0 15px"
            >
              {attribute2}
            </Text>
            <Text
              fontSize="20px"
              letterSpacing="-5.5%"
              fontFamily="inherit"
              margin="0 15px 0 15px"
            >
              {attribute3}
            </Text>
          </Flex>
      </Flex>
    </Box>
  );
};

const CardSlider = ({ currentCardIndex, setCurrentCardIndex }) => {

  const handleNext = () => {
    let nextIndex = currentCardIndex + 1;
    if (nextIndex === cards.length) {
      nextIndex = 0;
    }
    setCurrentCardIndex(nextIndex);
  };

  const handlePrev = () => {
    let prevIndex = currentCardIndex - 1;
    if (prevIndex < 0) {
      prevIndex = cards.length - 1;
    }
    setCurrentCardIndex(prevIndex);
  };

  return (
    <Box position="relative" height="400px" width="600px" margin="0 auto">
      <IconButton
        aria-label="Previous card"
        icon={<FaArrowLeft />}
        position="relative"
        right="40%"
        top="60%"
        transform="translateY(-50%)"
        zIndex="1"
        onClick={handlePrev}
      />
      <IconButton
        aria-label="Next card"
        icon={<FaArrowRight />}
        position="relative"
        left="40%"
        top="60%"
        transform="translateY(-50%)"
        zIndex="1"
        onClick={handleNext}
      />
      {cards.map((card, index) => (
        <Card
          key={card.id}
          name={card.name}
          description={card.description}
          attribute1={card.attribute1}
          attribute2={card.attribute2}
          attribute3={card.attribute3}
          imageFile={card.imageFile}
          visible={index === currentCardIndex}
        />
      ))}
    </Box>
  );
};

export default CardSlider;
