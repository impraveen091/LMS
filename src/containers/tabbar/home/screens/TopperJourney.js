import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React from 'react';
import {getHeight} from '../../../../common/constants';
import { useSelector } from 'react-redux';
import CSafeAreaView from '../../../../components/common/CSafeAreaView';
import CHeader from '../../../../components/common/CHeader';
import { useNavigation } from '@react-navigation/native';
import { StackNav } from '../../../../navigation/NavigationKeys';
import { colors } from '../../../../themes';

export default function TopperJourney() {
    const colors = useSelector(state => state.theme.theme);
    const navigation = useNavigation();
    return (
        <CSafeAreaView style={{ flex: 1 }}>
            <CHeader
                title={'Topper Journey'}
                isHideBack={false}
                customTextStyle={localStyles.headerText}
            />
            <ScrollView>
                <View style={{ padding: 10, rowGap: 10 }}>
                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/rank-1-upsc-2022-23-ishita-kishore'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>Ishita Kishore AIR-01 2022-23</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/rank-2-upsc-2022-23-garima-lohia'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>GARIMA LOHIA AIR-02 2022-23</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/rank-3-upsc-2022-23-uma-harathi'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>UMA HARATHI AIR-03 2022-23</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/rank-4-upsc-2022-23-smriti-mishra'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>SMRITI MISHRA AIR-04 2022-23</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/rank-5-upsc-2022-23-mayur-hazarika'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>MAYUR HAZARIKA AIR-05 2022-23</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/rank-6-upsc-2022-23-gahana-navya'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>GAHNA NAVYA AIR-06 2022-23</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/rank-7-upsc-2022-23-waseem-ahmad'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>WASEEM AHMED AIR-07 2022-23</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/rank-8-upsc-2022-23-anirudh-yadav'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>ANIRUDH YADAV AIR-08 2022-23</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/rank-9-upsc-2022-23-kanika-goyal'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>KANIKA GOYAL AIR-09 2022-23</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/rank-10-upsc-2022-23-rahul-srivastava'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>RAHUL SHRIVASTAVA AIR-10 2022-23</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/rank-1-upsc-2020-21-shubham-kumar'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>SHUBHAM KUMAR AIR-01 2020</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/jagrati-awasthi-rank-2-upsc-2020-21'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>JAGRITI AWASTHI AIR-02 2020</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/rank-3-upsc-2020-21-ankita-jain'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>ANKIT JAIN AIR-03 2020</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/shreyans-kumat-air-04-cse-2018'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>SHREYANS KUMAT AIR-04 2018</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/vaishali-singh-air-08-cse-2018'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>VAISHALI SINGH AIR-08 2018</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/gunjan-dwivedi-air-09-cse-2018'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>GUNJAN DWIVEDI AIR-09 2018</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/gss-praveenchand-air-64-cse-2018'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>GSS PRAVEENCHANDRA AIR-64 2018</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/anudeep-durishetty-air-01-cse-2017'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>ANUDEEP DURISHETTY AIR-1 2017</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/amit-kumar-rank-91-upsc-2018-19'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>AMIT KUMAR AIR-91 2018</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/anu-kumari-rank-2-upsc-2017-18'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>ANU KUMARI AIR-2 2017</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </CSafeAreaView>
    )
}

const localStyles = StyleSheet.create({
    bannerContainer: {
        width: '100%',
        height: getHeight(190),
        resizeMode: 'contain',
    },
    logo: {
        height: 80,
        width: 160,
    },
    testimonials: {
        height: 160,
        width: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },
    block: {
        width: 'auto',
        height: 40,
        backgroundColor: colors.light.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    }, TextStyle: { fontSize: 20, color: "white" }
});