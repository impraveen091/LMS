import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {reviewArray} from '../../../../api/constant';
import {colors, styles} from '../../../../themes';
import {getWidth, moderateScale} from '../../../../common/constants';
import Icons from 'react-native-vector-icons/MaterialIcons';
import PlayButton from '../../../../assets/svgs/playButton.svg';
import Collapsible from 'react-native-collapsible';
import CText from '../../../../components/common/CText';
import {Arrow_Down, Arrow_Up} from '../../../../assets/svgs';

const Reviews = ({contents1, contents2}) => {
  const [collapseStates, setCollapseStates] = useState(true);
  const [collapseVideo, setCollapseVideo] = useState(true);
  const [collapseTrial, setCollapseTrial] = useState([]);

  const toggleCollapsible = async index => {
    const newCollapseStates = [...collapseTrial];
    newCollapseStates[index] = !newCollapseStates[index];
    setCollapseTrial(newCollapseStates);
    return;
  };

  const renderCollapsibleSection = (index, title, id, data) => {
    console.log('submoduleData', data);
    return (
      <View
        key={index}
        style={{
          paddingHorizontal: 8,
          paddingTop: 8,
        }}>
        <TouchableOpacity onPress={() => toggleCollapsible(index, id)}>
          <View
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              elevation: 5,
              alignItems: 'center',
            }}>
            <CText type={'m16'}>{title}</CText>
            {collapseTrial[index] == false ? <Arrow_Up /> : <Arrow_Down />}
          </View>
        </TouchableOpacity>

        <Collapsible collapsed={collapseTrial[index]}>
          <View
            style={{
              width: getWidth(335),
              paddingHorizontal: 10,
            }}>
            {data?.map(item => (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <PlayButton height={24} width={24} />
                  <CText
                    type={'r12'}
                    style={{
                      flexWrap: 'wrap',
                      textAlign: 'left',
                      width: '95%',
                    }}>
                    {item?.name}
                  </CText>
                </View>
                <CText
                  style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                  }}
                />
              </View>
            ))}
          </View>
        </Collapsible>
      </View>
    );
  };
  return (
    <View style={[localStyles.root, {rowGap: 10}]}>
      <View>
        {contents1?.length == 0 ? null : (
          <View>
            <TouchableOpacity
              onPress={() => setCollapseStates(!collapseStates)}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: colors.backgroundColor,
                  borderRadius: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  elevation: 2,
                  alignItems: 'center',
                }}>
                <CText type={'m16'}>Test-Series</CText>
                {collapseStates == false ? <Arrow_Up /> : <Arrow_Down />}
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapseStates}>
              <View
                style={{
                  width: getWidth(330),
                  backgroundColor: 'white',
                  alignItems: 'center',
                }}>
                {contents1?.map((item, index) => {
                  return (
                    <View style={{rowGap: 15, padding: 10}} key={index}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          color: 'black',
                          textAlign: 'center',
                        }}>
                        Subject :- {item?.name}
                      </Text>
                      <View style={{flexDirection: 'row', columnGap: 70}}>
                        <View style={{rowGap: 15}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Icons name="quiz" color={'#5F5CF0'} size={24} />
                            <Text style={{fontSize: 15, color: 'black'}}>
                              {item?.totalQuestion} Questions
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Icons name="timer" color={'#5F5CF0'} size={24} />
                            <Text style={{fontSize: 15, color: 'black'}}>
                              {item?.duration} Mins
                            </Text>
                          </View>
                        </View>

                        <View style={{rowGap: 15}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Icons name="check" color={'#5F5CF0'} size={24} />
                            <Text style={{fontSize: 15, color: 'black'}}>
                              {item?.total_marks} Total Marks
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Icons
                              name="verified"
                              color={'#5F5CF0'}
                              size={24}
                            />
                            <Text style={{fontSize: 15, color: 'black'}}>
                              {item?.negative_marks} Negative Mark
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </Collapsible>
          </View>
        )}
      </View>

      <View>
        {contents2?.length == 0 ? null : (
          <View>
            <TouchableOpacity onPress={() => setCollapseVideo(!collapseVideo)}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: colors.backgroundColor,
                  borderRadius: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  elevation: 2,
                  alignItems: 'center',
                }}>
                <CText type={'m16'}>Reorded-Videos</CText>
                {collapseVideo == false ? <Arrow_Up /> : <Arrow_Down />}
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapseVideo}>
              <View style={{backgroundColor: colors.backgroundColor}}>
                {contents2?.map((item, index) =>
                  renderCollapsibleSection(
                    index,
                    item.name,
                    item.id,
                    item.video,
                  ),
                )}
              </View>
            </Collapsible>
          </View>
        )}
      </View>
    </View>
  );
};

export default Reviews;

const localStyles = StyleSheet.create({
  root: {
    ...styles.mt15,
    gap: moderateScale(25),
    ...styles.ph10,
    ...styles.mh10,
    ...styles.mb30,
    ...styles.flex,
    marginBottom: 100,
  },
  review: {
    ...styles.pv25,
    gap: moderateScale(25),
  },
});
