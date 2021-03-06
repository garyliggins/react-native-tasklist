import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import Task from './components/Task'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default function App() {
  const [tasks,setTasks] = useState();
  const [taskItems, setTaskItems] = useState([])

  const handleAddTask = () => {
    Keyboard.dismiss()
    setTaskItems([...taskItems, tasks])
    setTasks(null)
  }

  const completeTask =(index) => {
      let itemsCopy = [...taskItems];
      itemsCopy.splice(index,1);
      setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      {/* todays tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.item}>
          {/* this is where the tasks will go */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                   <Task  text={item} />
                </TouchableOpacity>
              )
              
             
            })
          }
          
        </View>
      </View>

      {/* write a task section */}
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={"write a task"} value={tasks} onChangeText={text => setTasks(text)} />

        <TouchableOpacity onPress={() => handleAddTask()}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold"
  },
  item: {
    marginTop: 30,
  },
  writeTaskWrapper:{
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  input:{
    paddingVertical: 15,
    width: 250,
    paddingHorizontal:15,
    backgroundColor: "white",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
    width: 250
  },
  addWrapper: {
    height: 60,
    width: 60,
    backgroundColor: "white",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  addText: {}
});
