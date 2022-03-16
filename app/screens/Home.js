import React, {useEffect, useState} from 'react';

import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  Dimensions,
  ToastAndroid,
} from 'react-native';

import Tts from 'react-native-tts';
import Voice from '@react-native-community/voice';
import Feather from 'react-native-vector-icons/Feather';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import MatCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tost } from '../util/Tost';
//import para1 from './app/database/data';
const para1 = [
  {user: 'robo', line: 'Hey , Hi.'},
  {user: 'persone', line: 'Hi'},
  {user: 'robo', line: 'How are You, Dear?'},
  {user: 'persone', line: 'I am fine, and You?'},
  {user: 'robo', line: 'i am also fine. So, what is going on'},
  {user: 'persone', line: 'I am just completing my pending homework.'},
  {user: 'robo', line: 'How much time it will take to complete?'},
  {
    user: 'persone',
    line: 'not mo\'re than  15 minutes. Why? Do you have work with me?',
  },
  {user: 'robo', line: 'yes, you always know, what i want.'},
  {user: 'persone', line: 'so, what is the problem my dear friend'},
  {
    user: 'robo',
    line: 'just simple, you just have to test this application and provide some suggession on it.',
  },
  {user: 'persone', line: 'Your idea is nice.'},
  {user: 'robo', line: 'please give me some suggession.'},
  {user: 'persone', line: 'i will think on it and tell you back.'},
  {user: 'robo', line: 'ok . bye'},
  {user: 'persone', line: 'bye.'},
];
let pointer = 0;
const Home = () => {
  const [result, setResult] = useState();
  const [result1, setResult1] = useState();
  const [roboText, setRoboText] = useState('');
  const [roboBtn, setRoboBtn] = useState(false);
  const [userBtn, setUserBtn] = useState(true);
  const [flag, setFlag] = useState(false);
  const [userText, setUserText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [skipCount, setSkipCount] = useState(3);
 
  const onSpeechStart = () => {
    console.log('onSpeechStart');
  };

  const onSpeechEnd = () => {
    Voice.stop();
    setModalVisible(false);
    console.log('onSpeechend');
  };

  const onSpeechResult = event => {
    console.log('onSpeechResult', event, result1, userText);
    verify(event);
  };

  const onSpeechError = event => {
    console.log('onSpeechError', event);
    Tost('Sorry, You Were Not Audible Properly');
  };

  const onSpeechPartialResult = event => {
    setResult(event.value[0]);
    console.log('partial reslt', event.value);
  };
  const checkPointer = () => {
    if (pointer != para1.length - 1){
      pointer++;
      return true;
    }
    else{
      Tost('Conversation End');
      return false;
    }
  }
  const roboSpeech = () => {
    Tts.speak(roboText.line);
    if (checkPointer()){
      console.log("robo", pointer);
      setUserText(para1[pointer]);
      setResult1('');
      setFlag(true);
    }
  };
  const userSpeech = () => {
    setModalVisible(true);
    Voice.start();
  };
  const verify = (event) => {
    if (convertString(para1[pointer].line) === convertString(event.value[0])) {
      if (checkPointer()) {
        setRoboText(para1[pointer]);
        setFlag(false);
        Tost("OK");
      }
    } else {
      let temp = "You Said:- " + event.value[0];
      setResult1(temp);
      Tost('Sorry, Speak Again');
      console.log(skipCount, 'skipcount');
      if(skipCount>0)
      setSkipCount((skipCount) => skipCount - 1);
    }
      
  }
  const convertString = (str) => {
    console.log(str,para1[pointer])
   let temp = str.replace(/[\p{P}]/gu,"").replace(/\s{2}/g," ");
		return temp.toLowerCase();
  }
  const onSkip = () => {
    if (checkPointer()) {
      setRoboText(para1[pointer]);
      setFlag(false);
      setSkipCount(3);
    }
  }
  useEffect(() => {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage('en_US');
    })
    console.log(convertString(para1[7].line))
    if (pointer == 0) setRoboText(para1[pointer]);

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResult;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechPartialResults = onSpeechPartialResult;

    return () => {
      //Voice.destroy.then(Voice.removeAllListeners);
    };
  }, []);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {console.log(roboText, userText, pointer) }
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={{justifyContent: 'space-between', flex:1, paddingHorizontal:10}}>
        <View style={{ flex: 1 }}>
          <Text style = {{color:'black', textAlign:'center', paddingTop:10}}> Practice Session
          </Text>
          {pointer == 0 &&
            <Text style={{ color: 'black', textAlign: 'center', paddingTop: 10 }}>
            Click Robo To Start Converstion
            </Text>}
          <TouchableOpacity onPress={() => roboSpeech()}
            style={[styles.button,{borderColor:!flag?'black':'#f2f2f2'}]}
          disabled = {flag}>
          <View style = {{flexDirection:'row'}}>
            {!flag &&
              <Font5 name="hand-point-right" size={15} style={{ paddingRight: 10 }} color='black' />}
              <Text style={{ color: !flag?'black':'#f3f3b3' }}>Robo</Text>
            </View>
          </TouchableOpacity>
          <Text style={{color: 'black'}}>{roboText.line}</Text>
        </View>
        <View style = {{flex:1}}>
        <Text style={{color: 'black', }}>
          {result1}
        </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical:10}}>
            <TouchableOpacity
              activeOpacity={0}
              disabled = {!flag}
              onPress={() => userSpeech()}
              style={[styles.buttonRow,{borderColor:flag?'black':'#f2f2f2'}]}>
              <View style = {{flexDirection:'row'}}>
                {flag &&
                  <Font5 name="hand-point-right" size={15} style={{ paddingRight: 10 }} color='black' />}
              <Text style={{ color: flag?'black':'#b3b3b3' }}> You</Text>
              </View>
              
            </TouchableOpacity>
            <View style={{flex:1}}/>
              
            <TouchableOpacity
              disabled={!(skipCount == 0)}
              onPress={() => onSkip()}
              style={[styles.buttonRow,
              { borderColor: skipCount == 0?'black':'#f2f2f2'}]}>
                <Text style={{color: skipCount == 0?'black':'#b3b3b3'}}>Skip after {skipCount } try</Text>
              </TouchableOpacity>
           
          </View>
          <Text style = {{color:"black"}}>{userText.line}</Text>
        </View>
      </View>

      <View style={{alignItems: 'flex-end'}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
         
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              marginTop: (Dimensions.get('screen').height / 2)-10,
              opacity: 1,
              backgroundColor:'white',
              elevation: 10,
              borderTopWidth: 1,
              borderColor:'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}>
            
            <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
              <MatCIcon name="account-voice" size={30} color="black" />
              {"  "+userText.line}
            </Text>
            <Feather
              name="mic"
              size={50}
              color="black"
              style={{textAlign: 'center', paddingVertical: 20}}
            />
            <Text style={{color: 'black'}}>You Said:{result}</Text>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 20,
  },
  buttonRow: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default Home;
