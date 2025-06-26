import { Heading, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ProductDTO } from "../dtos/ProductDTO";

type Props = TouchableOpacityProps & {
  data: ProductDTO;
};

export function ProductCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="$background"
        alignItems="center"
        p="$2"
        pr="$4"
        rounded="$md"
        mb="$3"
      >
        <Image
          source={{
            uri: `${data.attachments[0].url}`,
          }}
          alt="Imagem do exercício"
          w="$40"
          h="$24"
          rounded="$md"
          mr="$4"
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Text fontSize="$xs" color="$gray400">
            {data.title}
          </Text>
          <Heading
            fontSize="$sm"
            color="$gray500"
            mt="$1"
            fontFamily="$heading"
          >
            R$ {data.priceInCents}
          </Heading>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}
