import { useState, useEffect } from "react";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const cards = [
  {
    id: 1,
    name: "Edward Bellybottom",
    description:
      "Introducing Edward Bellybottom. Living in his castle, he contemplates on the smallness of humans, and uses the Force to protect his cat realm.",
  },
  {
    id: 2,
    name: "Jane Doe",
    description:
      "Jane Doe is an artist and writer based in New York City. Her work explores themes of identity, memory, and the natural world.",
  },
  {
    id: 3,
    name: "John Smith",
    description:
      "John Smith is a software engineer and entrepreneur based in San Francisco. He is passionate about building innovative products that solve real-world problems.",
  },
];

const Card = ({ name, description, visible }) => {
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
      height="100%"
      top="0"
      left="0"
      opacity={opacity}
      transition="opacity 0.5s ease"
      onTransitionEnd={handleTransitionEnd}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Text fontSize="48px" textShadow="0 px #00000">
          {name}
        </Text>
        <Text
          fontSize="30px"
          letterSpacing="-5.5%"
          fontFamily="inherit"
          textShadow="0 2px 2px"
        >
          {description}
        </Text>
      </Flex>
    </Box>
  );
};

const CardSlider = ({currentCardIndex, setCurrentCardIndex}) => {

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
        position="absolute"
        left="0"
        top="50%"
        transform="translateY(-50%)"
        zIndex="1"
        onClick={handlePrev}
      />
      <IconButton
        aria-label="Next card"
        icon={<FaArrowRight />}
        position="absolute"
        right="0"
        top="50%"
        transform="translateY(-50%)"
        zIndex="1"
        onClick={handleNext}
      />
      {cards.map((card, index) => (
        <Card
          key={card.id}
          name={card.name}
          description={card.description}
          visible={index === currentCardIndex}
        />
      ))}
    </Box>
  );
};

export default CardSlider;
