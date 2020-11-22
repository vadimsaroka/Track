import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    reset,
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTrack();

  return (
    <>
      {/* <Spacer />
      <Spacer /> */}
      {/* <Input
        placeholder="Enter name"
        value={name}
        autoCorrect={false}
        style={{ color: "rgb(146, 171, 207)" }}
        onChangeText={(name) => {
          changeName(name);
        }}
      /> */}
      {recording ? (
        <Spacer>
          <Button
            title="STOP"
            onPress={stopRecording}
            // loading
            linearGradientProps={{
              colors: ["rgb(255, 0, 87)", "rgb(255, 0, 50)"],
            }}
          />
        </Spacer>
      ) : !recording && locations.length ? (
        <>
          <Spacer>
            <Button
              title="SAVE"
              titleStyle={{ color: "rgb(33, 44, 61)" }}
              onPress={saveTrack}
              linearGradientProps={{
                colors: ["rgb(17, 236, 229)", "rgb(17, 236, 229)"],
              }}
            />
          </Spacer>
          <Spacer>
            <Button
              title="CANCEL"
              linearGradientProps={{
                colors: ["rgb(255, 0, 87)", "rgb(255, 0, 50)"],
              }}
              onPress={reset}
            />
          </Spacer>
        </>
      ) : (
        <Spacer>
          <Button
            title="START TRACKING"
            onPress={startRecording}
            linearGradientProps={{
              colors: ["rgb(17, 236, 229)", "rgb(17, 236, 229)"],
            }}
            titleStyle={{ color: "rgb(33, 44, 61)" }}
          />
        </Spacer>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default TrackForm;
