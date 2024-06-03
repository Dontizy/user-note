import { Box, Heading, Text} from '@chakra-ui/react'

const About =()=>{
  return (
    <Box w="99%" minH="160px" id="about" mt="10px">
     <Box w="100%" h="200px" bg="#FFF2D7" display="flex" alignItems="center" justifyContent="center">
     
     <Box width="220px" h="100px">
     <Heading size="md">About Notio</Heading>
     <Text>We keep memories alive, event special, every day of ur life should be memorable</Text>
      </Box>
     </Box>
    </Box>
    )
}
export default About;