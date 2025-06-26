import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import { ProductCard } from "@components/ProductCard";
import { ToastMessage } from "@components/ToastMessage";
import { Heading, HStack, useToast, VStack } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import api from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { ProductDTO } from "../dtos/ProductDTO";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [products, setProducts] = useState<ProductDTO[]>([]);

  function handleOpenProductDetails(productId: string) {
    //navigation.navigate("product", { productId });
  }

  async function fecthProducts() {
    try {
      setIsLoading(true);
      const response = await api.get(`/products`);
      setProducts(response.data.products);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const errorTitle = isAppError
        ? error.message
        : "Não foi possível carregar os produtos";
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={errorTitle}
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fecthProducts();
    }, [])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack px="$8" flex={1}>
          <HStack justifyContent="space-between" mb="$5" alignItems="center">
            <Heading color="$gray500" fontSize="$sm">
              Explore produtos
            </Heading>
          </HStack>

          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductCard
                onPress={() => handleOpenProductDetails(item.id)}
                data={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  );
}
