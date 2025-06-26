import defaulUserPhotoImg from "@assets/userPhotoDefault.png";
import { Heading, HStack, Icon, VStack } from "@gluestack-ui/themed";
import useAuth from "@hooks/useAuth";
import { LogOut } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { UserPhoto } from "./UserPhoto";

export function HomeHeader() {
  const { user, signOut } = useAuth();

  return (
    <HStack
      bg="$background"
      pt="$16"
      pb="$5"
      px="$8"
      alignItems="center"
      gap="$4"
    >
      <UserPhoto
        source={
          user.avatar ? { uri: `${user.avatar.url}` } : defaulUserPhotoImg
        }
        w="$16"
        h="$16"
        alt="Imagem do usuário"
      />

      <VStack flex={1}>
        <Heading color="$gray500" fontSize="$md">
          Olá, {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={LogOut} color="$gray200" size="xl" />
      </TouchableOpacity>
    </HStack>
  );
}
