import { StyleSheet, Text, View, Linking, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import Button from "../../components/UI/Button";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { updateResourceRequest } from "../../utilities/routes/resource";
import { useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";

export default function ResourceDetailsScreen({ navigation, route }) {
  const request = route.params.item;

  const user = useSelector((state) => state.user);
  const { name, email, phone } = user;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: request.resourceName,
    });
  }),
    [navigation, request];

  const call = (phone) => {
    const phoneBool =
      phone.trim() === "Not Available" ? false : request.approvedByPhone;

    if (phoneBool) {
      const url = `tel:${phone}`;
      Linking.openURL(url);
    } else {
      showMessage({
        message: "Phone number not available",
        type: "warning",
        icon: "warning",
      });
    }
  };

  const sendEmail = (email) => {
    const emailBool =
      email.trim() === "Not Available" ? false : request.requestedByEmail;

    if (emailBool) {
      const url = `mailto:${email}`;
      Linking.openURL(url);
    } else {
      showMessage({
        message: "Email not available",
        type: "warning",
        icon: "warning",
      });
    }
  };

  const approveRequest = async () => {
    if (request.requestedByEmail === user.email) {
      showMessage({
        message: "You cannot approve your own request",
        type: "warning",
        icon: "warning",
      });
    } else {
      const record = {
        id: request._id,
        requestStatus: "Approved",
        approvedByName: name,
        approvedByEmail: email,
        approvedByPhone: phone,
      };
      const response = await updateResourceRequest(record);
      showMessage({
        message: response.message,
        type: response.status === "200" ? "success" : "danger",
        icon: response.status === "200" ? "success" : "danger",
      });

      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Resource Requested</Text>
          <Text style={styles.details}>{request.resourceName}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Duration</Text>
            <Text style={styles.details}>{request.resourceDuration}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Quantity</Text>
            <Text style={styles.details}>{request.resourceQuantity}</Text>
          </View>
        </View>
        {request.resourceNotes !== "" && (
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Additional Notes</Text>
            <Text style={styles.details}>{request.resourceNotes}</Text>
          </View>
        )}
        <View style={styles.divider}></View>

        {request.requestedByEmail !== email && (
          <>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Requested By:</Text>
              <Text style={styles.details}>{request.requestedByName}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Contact Number</Text>
              <Text style={styles.details}>{request.requestedByPhone}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Email</Text>
              <Text
                onPress={sendEmail.bind(this, request.requestedByEmail)}
                style={[styles.details, styles.email]}
              >
                {request.requestedByEmail}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Address</Text>
              <Text style={styles.details}>{request.requestedByAddress}</Text>
            </View>

            <View style={styles.divider}></View>
          </>
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Request Status</Text>
          <Text style={styles.details}>{request.requestStatus}</Text>
        </View>

        {request.requestStatus !== "Pending" &&
          request.requestedByEmail === email && (
            <>
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>Request Approved By</Text>
                <Text style={styles.details}>{request.approvedByName}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.title}>Contact Number</Text>
                <Text style={styles.details}>{request.approvedByPhone}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>Email</Text>
                <Text
                  onPress={sendEmail.bind(this, request.approvedByEmail)}
                  style={[styles.details, styles.email]}
                >
                  {request.approvedByEmail}
                </Text>
              </View>
            </>
          )}

        {request.requestStatus !== "Approved" &&
          request.requestedByEmail !== email && (
            <Button
              style={styles.button}
              textSize={16}
              onPress={approveRequest}
            >
              Approve Request
            </Button>
          )}

        {request.requestStatus === "Approved" &&
          request.approvedByEmail !== email && (
            <Button
              style={styles.button}
              textSize={16}
              onPress={call.bind(this, request.approvedByPhone)}
            >
              Call {request.approvedByName.split(" ")[0]}
            </Button>
          )}

        {request.requestedByEmail !== email && (
          <Button
            style={styles.button}
            textSize={16}
            onPress={call.bind(this, request.requestedByPhone)}
          >
            Call {request.requestedByName.split(" ")[0]}
          </Button>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: gs.colors.primary,
    margin: "5%",
    paddingVertical: "5%",
    paddingHorizontal: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  name: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  detailsContainer: {
    marginVertical: "2%",
    marginHorizontal: "5%",
  },
  title: {
    color: "white",
    fontSize: 12,
    marginHorizontal: "2%",
    textAlign: "center",
  },
  details: {
    color: "white",
    fontSize: 16,
    marginHorizontal: "2%",
    textAlign: "center",
  },
  email: {
    textDecorationLine: "underline",
  },
  button: {
    marginTop: "5%",
    minWidth: "60%",
    maxWidth: "70%",
  },
  infoContainer: {
    margin: "5%",
    padding: "2%",
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    borderColor: "white",
    borderBottomWidth: 1,
    borderRadius: 10,
    width: "80%",
    marginVertical: "5%",
  },
});
