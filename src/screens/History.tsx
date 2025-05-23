import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { ToastMessage } from "@components/ToastMessage";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { Heading, Text, useToast, VStack } from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import api from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useState } from "react";
import { SectionList } from "react-native";

export function History() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get("/history");
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const errorTitle = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício";

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
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading
              color="$gray200"
              fontSize="$md"
              mt="$10"
              mb="$3"
              fontFamily="$heading"
            >
              {section.title}
            </Heading>
          )}
          contentContainerStyle={
            exercises.length === 0
              ? {
                  flex: 1,
                  justifyContent: "center",
                  paddingHorizontal: 8,
                }
              : {
                  paddingHorizontal: 32,
                }
          }
          ListEmptyComponent={() => (
            <Text color="$gray100" textAlign="center">
              Não há exercícios registrados ainda. {"\n"}
              Vamos fazer exercícios hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  );
}
