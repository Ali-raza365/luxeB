import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, WP } from '../../theme/config'

const Profile = () => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.boldText}>Personal information</Text>
                <MatComIcon name="pencil" size={WP(7)} color={COLORS.blackColor} />
            </View>
            <View style={styles.row}>
                <View style={styles.leftViewContainer}>
                    <View style={{marginBottom:WP(5)}}>
                        <Text style={styles.labelSty}>Name</Text>
                        <Text style={styles.textSty}>Maria Bethany</Text>
                    </View>
                    <View style={{marginBottom:WP(5)}}>
                        <Text style={styles.labelSty}>Contact Number</Text>
                        <Text style={styles.textSty}>+8801800000000</Text>
                    </View>
                    <View style={{marginBottom:WP(5)}}>
                        <Text style={styles.labelSty}>Date of birth</Text>
                        <Text style={styles.textSty}>DD MM YYYY</Text>
                    </View>
                    <View style={{marginBottom:WP(5)}}>
                        <Text style={styles.labelSty}>Location</Text>
                        <Text style={styles.textSty}>Add Details</Text>
                    </View>

                </View>
                <View style={[styles.rightViewContainer, { overflow: 'visible' }]}>
                    <View style={styles.rightViewContainer}>
                        <Image resizeMode='cover' style={{ width: '100%', height: '100%' }} source={{ uri: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" }} />
                    </View>
                    <Ionicons
                        style={styles.cameraIconSty}
                        name="camera" size={WP(7)}
                        color={COLORS.whiteColor}
                    />
                </View>
            </View>

            <View style={{ borderWidth: 1, borderColor: COLORS.grey, marginVertical: WP(3), }} />

            <Text style={styles.headingText}>Addresses</Text>
            <Text style={styles.headingText}>Payment Methods</Text>
            <Text style={styles.headingText}>Vouchers</Text>

        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: WP(8)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    boldText: {
        fontSize: WP(4.5),
        letterSpacing: 1,
        fontWeight: '700',
        color:COLORS.blackColor,
        
    },
    rightViewContainer: {
        marginTop: WP(4),
        width: WP(33),
        borderRadius: WP(25),
        overflow: 'hidden',
        height: WP(33),
    },
    cameraIconSty: {
        position: 'absolute',
        bottom: -8,
        right: -5,
        padding: WP(1.5),
        borderRadius: WP(5),
        overflow: 'hidden',
        backgroundColor: 'rgb(103,114,148)'
    },
    leftViewContainer: {
        marginTop: WP(4),
        width: '60%',
    },
    labelSty: {
        fontSize: WP(3.3),
        letterSpacing: 1,
        fontWeight: '700',
        color:COLORS.blackColor,
    },
    textSty: {
        marginTop: WP(2.5),
        fontSize: WP(4),
        letterSpacing: 1,
        color:COLORS.blackColor,
    },
    headingText: {
        marginTop:WP(5),
        fontSize: WP(4.5),
        letterSpacing: 1,
        fontWeight: '700',
        color:COLORS.blackColor,
        
    },
})