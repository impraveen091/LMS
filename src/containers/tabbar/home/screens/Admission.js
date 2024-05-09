import { View } from 'react-native'
import React from 'react'
import CSafeAreaView from '../../../../components/common/CSafeAreaView'
import Footer from '../../../HeaderFooter/Footer'
import Header from '../../../HeaderFooter/Header'

export default function Admission() {
  return (
    <CSafeAreaView style={{ flex: 1 }}>
      <Header clearData={() => {
        }}
        onPressMenu={() => {  
        }} webLink={'https://chahalacademy.com/admission?data=app'}/> 
 
     <View style={{ width: "100%", position: "absolute", zIndex: 1000, bottom: -9, backgroundColor: "white", justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingVertical: 10, elevation: 5 }}>
        <Footer />
      </View>
    </CSafeAreaView>
  )
}