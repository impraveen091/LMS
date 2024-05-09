import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ActionSheet from 'react-native-actions-sheet';
import {styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import {useSelector} from 'react-redux';
import {
  CheckMark_Icon,
  Cross_Close_Dark_Icon,
  Cross_Close_Icon,
} from '../../assets/svgs';
import CText from '../common/CText';
import strings from '../../i18n/strings';
import {LearningPaths} from '../../api/constant';

const LearningModel = props => {
  const {SheetRef} = props;
  const colors = useSelector(state => state.theme.theme);
  const [learnData, setLearnData] = useState(LearningPaths);

  useEffect(() => {
    selectionData();
  }, []);

  const selectionData = () => {
    const data = LearningPaths.map(item => {
      return {
        ...item,
        selected: false,
      };
    });
    setLearnData(data);
  };

  const onPressItem = id => {
    const data = learnData.map(item => {
      if (item.id === id) {
        return {
          ...item,
          selected: !item.selected,
        };
      } else {
        return {
          ...item,
          selected: false,
        };
      }
    });
    setLearnData(data);
  };

  const renderLearningPath = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressItem(item.id)}
        style={[
          localStyles.learnItem,
          {
            borderColor: colors.dividerLine,
          },
        ]}>
        <CText type={'r16'} style={styles.m15}>
          {item.title}
        </CText>
        {item.selected && <CheckMark_Icon />}
      </TouchableOpacity>
    );
  };

  const onPressClose = () => {
    SheetRef?.current?.hide();
  };

  return (
    <ActionSheet
      ref={SheetRef}
      gestureEnabled={true}
      indicatorStyle={{
        backgroundColor: colors.inputBg,
        ...styles.actionSheetIndicator,
      }}
      containerStyle={[
        localStyles.actionSheetContainer,
        {backgroundColor: colors.backgroundColor},
      ]}>
      <View style={localStyles.bottomContainer}>
        <TouchableOpacity style={localStyles.header} onPress={onPressClose}>
          {colors.dark == 'dark' ? (
            <Cross_Close_Dark_Icon
              width={moderateScale(24)}
              height={moderateScale(24)}
            />
          ) : (
            <Cross_Close_Icon
              width={moderateScale(24)}
              height={moderateScale(24)}
            />
          )}
        </TouchableOpacity>
        <CText type={'s16'} align={'center'} style={styles.mv15}>
          {strings.learningPath}
        </CText>
        <FlatList
          data={learnData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderLearningPath}
        />
      </View>
    </ActionSheet>
  );
};

const localStyles = StyleSheet.create({
  actionSheetContainer: {
    // ...styles.ph20,
  },
  bottomContainer: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    position: 'absolute',
    ...styles.ml15,
    ...styles.mv15,
  },
  learnItem: {
    borderBottomWidth: 1,
    ...styles.rowSpaceBetween,
    ...styles.mh10,
  },
});

export default LearningModel;
