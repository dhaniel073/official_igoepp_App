import { useContext, useEffect, useState } from "react";
import { FlatList, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ShowFetchedRequests } from "../util/auth";
import { AuthContext } from "../store/auth-context";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { Image } from "expo-image";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import axios from "axios";
import filter from "lodash.filter";

function ServiceHistory({navigation}){
    const authCtx = useContext(AuthContext)
    const [isFetching, setIsFetching] = useState(false)
    const [fetchedRequest, setFetchedRequest] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [fullData, setFullData] = useState([])

    const API_ENDPOINT = `http://phixotech.com/igoepp/public/api/auth//hrequest/showrequestbycustomerid/${authCtx.customerId}`



    const customerId = authCtx.customerId
    const token = authCtx.token

    useEffect(() => {
        navigation.addListener('state', async() => {
        // async function fetchData(){
            try{
                setIsFetching(true)
                const response = await ShowFetchedRequests(customerId, token)
                setData(response)
                setFetchedRequest(response.data)
                setFullData(response.data)
                setIsFetching(false)
            }catch(error){
                setIsFetching(true)
                console.log(error)
                setIsFetching(false)
            }
        // }
    })
        // fetchData()
    }, [])

    // console.log(fullData)
    const handleSearch = (query) => {
        setSearchQuery(query)
        const formattedQuery = query
        const filteredData = filter(fullData, (cat_name) => {
            return contains(cat_name, formattedQuery)
        })
        // console.log(filteredData)
        setFetchedRequest(filteredData)
    }

    const contains = ({cat_name, help_country, help_state, help_lga}, query) => {
        // const name = cat_name.includes('L')
        if(cat_name.includes(query) || help_country.includes(query) || help_state.includes(query) || help_lga.includes(query)){
            return true
        }
        
        return false
    }


    if(isFetching){
        return <LoadingOverlay message={"..."}/>
    }

    return (
        <SafeAreaView style={{ marginHorizontal:8 }}>
            <View>
                <TextInput
                placeholder="Search"
                style={styles.searchInput}
                clearButtonMode="always"
                // autoCapitalize=""
                autoCorrect={false}
                value={searchQuery}
                onChangeText={(query) => handleSearch(query)}
                />
            </View>
            
            <FlatList
                showsVerticalScrollIndicator={false}
                data={fetchedRequest}
                style={{ marginBottom: '30%' }}
                key={(item) => item.id}
                renderItem={({item}) => 
                        <View style={{ flex:1 }}>
                            <Text style={styles.serviceDate}>{item.created_at}</Text>

                                <TouchableOpacity style={[styles.pressables, {flexDirection: 'row', justifyContent:'space-between'}]}>
                                    <Text style={styles.serviceName}>{item.cat_name}</Text>
                                    <View>
                                   {/* <Text>{item.help_country}</Text>
                                        <Text>{item.help_state}</Text>*/}
                                    <Text>{item.help_lga}</Text>
                                    </View>

                                    <View>
                                        <View>
                                            <Text  style={{ fontFamily: 'poppinsBold', color: Color.tomato, marginRight:20 }}>{item.help_status === 'X' ? 'Cancelled': item.help_status === 'A' ? 'Accepted' : "Pending" }</Text>
                                        </View>
                                        
                                    </View>

                                </TouchableOpacity>
                        </View>
            }
            />
        </SafeAreaView>
    )
}

export default ServiceHistory

const styles = StyleSheet.create({
        
    serviceName:{
        fontSize: FontSize.size_xl,
        color: Color.darkolivegreen_100,
        fontFamily: 'poppinsBold',
        paddingBottom: 13,
        paddingLeft:10
    },
    serviceDate:{
        marginHorizontal: 10,
        fontSize: 18,
        fontFamily: 'poppinsSemiBold'
    },
    pressables:{
        // backgroundColor: Color.skyblue,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        // backgroundColor: 'white',
        overflow: Platform.OS === 'andriod' ? 'hidden' : 'visible',
        backgroundColor: Color.mintcream,
        margin: 8,
        height: 145,
        padding: 10,
        paddingTop: 20
    },
    searchInput:{ 
        paddingHorizontal:20, 
        paddingVertical:10, 
        borderColor:"#ccc", 
        borderWidth:1, 
        borderRadius:8, 
        marginBottom: '8%'
    }
})