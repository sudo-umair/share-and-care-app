import { StyleSheet } from "react-native";
import React, { useCallback, useLayoutEffect } from "react";
import ResourcesTabs from "../../navigators/ResourcesTabs";
import { getResourceRequestsList } from "../../utilities/routes/resource";
import { useDispatch } from "react-redux";
import {
  setResources,
  setIsLoading,
  removeResources,
} from "../../store/resources";
import Icon from "../../components/UI/Icon";
import { showMessage } from "react-native-flash-message";
import { useFocusEffect } from "@react-navigation/native";

export default function ResourcesScreen({ navigation }) {
  const goToRequestResourceScreen = () => {
    navigation.navigate("PostRequest");
  };

  const dispatch = useDispatch();

  const getResourceRequests = useCallback(async () => {
    dispatch(setIsLoading(true));
    const response = await getResourceRequestsList({
      userType: "user",
    });
    if (response.status === "200") {
      dispatch(setResources(response.results));
    } else {
      showMessage({
        message: "Something went wrong",
        type: "warning",
        icon: "warning",
      });
    }
    dispatch(setIsLoading(false));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          lib={"i"}
          size={26}
          color={"blue"}
          name={"ios-create-outline"}
          onPress={goToRequestResourceScreen}
        />
      ),
      headerRightContainerStyle: {
        marginRight: 10,
      },
    });
  }, []);

  useLayoutEffect(() => {
    getResourceRequests();

    return () => {
      dispatch(removeResources());
      dispatch(setIsLoading(true));
    };
  });

  useFocusEffect(() => {
    getResourceRequests();
  });

  return <ResourcesTabs />;
}

const styles = StyleSheet.create({});
