import React, { useEffect, useState } from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { COLORS, DAYS, HP, SPACING_PERCENT, TEXT_SIZES, WP } from '../../../theme/config'
import { _formatDate, getFullMonthName, isCurrentDate } from '../../../utils/TimeFunctions'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BottomSheetDropdown, Button, Loader } from '../../../components'
import { useNavigation } from '@react-navigation/native'
import actions from '../../../store/actions'
import { useSelector } from 'react-redux'
import { getItem } from '../../../utils/axios'

export default function LocationModal({  coordinate, isVisible, onBackButtonPress, onBackdropPress }) {

    const navigation = useNavigation()
    const [district, setDistrict] = useState('');
    const [subDistrict, setSubDistrict] = useState('');
    const districtsArr = useSelector(store => store.user.districts);
    const [subDistrictsArr, setSubDistrictsArr] = useState([])

    const [districtModal, setdistrictModal] = useState(false);
    const [districtSubModal, setdistrictSubModal] = useState(false);
    const [loading, setloading] = useState(false)

    const onDistricSelect = async (val) => {
        try {
            setdistrictModal(false);
            setSubDistrict('')
            setloading(true)
            setDistrict(val)
            const data = { district_id: val?.id }
            const subDistrictRes = await actions.fetchSubDistricts(data)
            if (subDistrictRes) {
                setSubDistrictsArr(subDistrictRes);
                setloading(false)
            }
        } catch (error) {
            Alert.alert(error.message);
            setloading(false)
        }
    }

    const onSaveLocation = async () => {
        try {
            const customer_id = await getItem('user')
            const data = {
                district: district.id,
                sub_district: subDistrict.id,
                lat: Number(coordinate?.latitude),
                long:Number(coordinate?.longitude),
                customer: customer_id?.id
            }
            let resp = await actions.SaveUserLocation(data)
            if (resp) {
                onBackButtonPress()
                navigation.navigate('gender');
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    return (
        <Modal
            isVisible={isVisible}
            style={Styles._modal}
            onBackButtonPress={onBackButtonPress}
            onBackdropPress={onBackdropPress}
        >

            <Loader isVisible={loading} />
            <BottomSheetDropdown
                lable={'Select District'}
                data={districtsArr}
                isVisible={districtModal}
                onCloseModal={() => setdistrictModal(false)}
                onPressItem={(val) => onDistricSelect(val)}
            />

            <BottomSheetDropdown
                lable={'Select Sub District'}
                data={subDistrictsArr}
                isVisible={districtSubModal}
                onCloseModal={() => setdistrictSubModal(false)}
                onPressItem={(val) => { setdistrictSubModal(false); setSubDistrict(val) }}
            />

            <View style={Styles._modalMain}>
                <View style={Styles.dashView} />
                <Text style={Styles._lable} >When and where would you like to receive service?</Text>
                <View style={Styles.detailSty} >
                    <View style={Styles.row}>
                        <Ionicons name={"locate"} size={WP(8)} color={COLORS.blackColor} />
                        <View style={{ width: '80%', paddingLeft: WP(2), }}>
                            <Text style={Styles.titleSty}>Select District</Text>
                            {district && <Text numberOfLines={1} style={Styles.textSty}>{district?.name || ''}</Text>}
                        </View>
                        <AntDesign onPress={() => { setdistrictModal(true) }} name={"edit"} size={WP(8)} color={COLORS.blackColor} />
                    </View>
                    <View style={Styles.row}>
                        <Ionicons name={"locate"} size={WP(8)} color={COLORS.blackColor} />
                        <View style={{ width: '80%', paddingLeft: WP(2), }}>
                            <Text style={Styles.titleSty}>Select Sub District</Text>
                            {subDistrict && <Text numberOfLines={1} style={Styles.textSty}>{subDistrict?.name || ''}</Text>}
                        </View>
                        <AntDesign onPress={() => { setdistrictSubModal(true) }} name={"edit"} size={WP(8)} color={COLORS.blackColor} />
                    </View>
                </View>
                <View style={Styles._calendarContainer}>
                    <Button
                        onPress={() => { onSaveLocation(); }}
                        buttonStyle={{ alignSelf: 'center', }}
                        title={"Save"} />
                </View>
            </View>
        </Modal>
    )
}

const Styles = StyleSheet.create({
    _modal: {
        alignItems: "center",
        justifyContent: "flex-end",
        margin: 0,
        padding: 0
    },
    _modalMain: {
        width: WP(100),
        height: HP(38),
        backgroundColor: COLORS.whiteColor,
        padding: WP(5)
    },
    _iconMain: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: WP(3)
    },
    _lable: {
        paddingVertical: WP(4),
        fontSize: WP(5),
        color: COLORS.blackColor,
        fontWeight: "bold",
        letterSpacing: 1,
        lineHeight: 25,
        width: '80%'
    },
    dashView: {
        width: WP(10),
        borderWidth: 1.5,
        borderColor: COLORS.gray500,
        alignSelf: 'center'
    },
    _calendarView: {
        marginTop: WP(5),
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
    },
    detailSty: {
        width: '95%',
        alignSelf: 'center',
        // backgroundColor: 'cyan'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: WP(SPACING_PERCENT)
    },
    titleSty: {
        fontSize: WP(4.5),
        color: COLORS.blackColor,
        fontWeight: "600",
        letterSpacing: 1,
        paddingBottom: WP(1.5)
    },

    textSty: {
        fontSize: WP(3.2),
        color: COLORS.blackColor,
        letterSpacing: 1,
    },

})