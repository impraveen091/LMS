import {FlatList, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {ProjectArray} from '../../../../api/constant';
import {styles} from '../../../../themes';
import {moderateScale} from '../../../../common/constants';
import CText from '../../../../components/common/CText';
import {Like} from '../../../../assets/svgs';

const Projects = () => {
  const colors = useSelector(state => state.theme.theme);
  const renderProject = ({item}) => {
    return (
      <View
        style={[
          localStyles.projectContainer,
          {
            backgroundColor: colors.categoryColor,
            shadowColor: colors.shadowColor,
          },
        ]}>
        <Image source={item.image} style={localStyles.projectImage} />
        <CText type="s14" style={styles.flex} numberOfLines={2}>
          {item.project_title}
        </CText>
        <View style={[styles.rowCenter]}>
          <Like width={moderateScale(18)} height={moderateScale(18)} />
          <CText
            type="m14"
            style={styles.flex}
            color={colors.labelText}
            numberOfLines={2}>
            {item.likes}
          </CText>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      numColumns={2}
      data={ProjectArray}
      renderItem={renderProject}
      style={localStyles.list}
    />
  );
};

export default Projects;

const localStyles = StyleSheet.create({
  projectContainer: {
    ...styles.flex,
    ...styles.p10,
    width: '40%',
    marginHorizontal: '2%',
    marginVertical: '2%',
    borderRadius: moderateScale(16),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  projectImage: {
    width: '100%',
    height: moderateScale(132),
    borderRadius: moderateScale(16),
    ...styles.mb10,
  },
});
