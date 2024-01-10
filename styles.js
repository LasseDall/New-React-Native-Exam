import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    heading: {
        fontSize: 24,
        marginBottom: 16,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        width: '100%',
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 10,
        width: '100%',
        alignItems: 'center',
        margin: 2,
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
    },
    item: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        width: '100%'
    },
    itemText: {
        fontSize: 16,
        width: '96%',
        textAlign: 'center'
    },
    deleteButton: {
        backgroundColor: 'clear',
        borderRadius: 5,
        justifyContent: 'flex-end',
        paddingRight: '5%',
        marginTop: 'auto'
    },
    deleteButtonText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 16,
    },
    deleteView: {
        flex: 1,
        alignItems: 'flex-end',
    },
    vinylImg: {
        height: 200,
        width: 200,
        paddingBottom: '5%'
    },
    dropdownContainer: {
        height: 40, 
        marginVertical: 10
    },
    dropdown: {
        backgroundColor: '#fafafa'
    },
    dropdownItem: {
        justifyContent: 'flex-start'
    },
    searchInput: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 2, 
        textAlign: 'center',
        borderRadius: 1,
        padding: 1
    },
    exploreAlbum: {
        marginBottom: 10,
        textAlign: 'center',
    },
    exploreText: {
        textAlign: 'center'
    }
    });