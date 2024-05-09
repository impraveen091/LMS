import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React from 'react';
import {
    getHeight,
} from '../../../../common/constants';
import { useSelector } from 'react-redux';
import CSafeAreaView from '../../../../components/common/CSafeAreaView';
import CHeader from '../../../../components/common/CHeader';
import { useNavigation } from '@react-navigation/native';
import { StackNav } from '../../../../navigation/NavigationKeys';
import { colors } from '../../../../themes';

export default function BasicInfo() {
    const colors = useSelector(state => state.theme.theme);
    const navigation = useNavigation();
    return (
        <CSafeAreaView style={{ flex: 1 }}>
            <CHeader
                title={'Basic Information'}
                isHideBack={false}
                customTextStyle={localStyles.headerText}
            />
            <ScrollView>
                <View style={{ padding: 10, rowGap: 10 }}>
                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/ias-full-form'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>IAS FULL FORM</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/ips-full-form'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>IPS FULL FORM</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/irs-full-form'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>IRS FULL FORM</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/all-about-IFS'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>IFS FULL FORM</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/all-about-ifos'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>IFOS FULL FORM</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/upsc-fullform'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>UPSC FULL FORM</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/all-about-lbsnaa'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>LBSNAA FULL FORM</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            let links = 'https://chahalacademy.com/ias-vs-ips'
                            navigation.navigate(StackNav.Eligibility, {
                                link: links,
                            })
                        }}
                        style={localStyles.block}>
                        <Text style={localStyles.TextStyle}>IAS Vs IPS Powers</Text>
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