import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    roundedInput: {
        borderRadius: 12,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    weekdayContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        display: 'flex',
        borderRadius: 12,
        backgroundColor: '#ccc',
        columnGap: 1,
        overflow: "hidden"
    },
    weekdayButton: {
        padding: 12,
        backgroundColor: "#ffffff",
        flexGrow: 1
    },
    weekdayButtonSelected: {
        backgroundColor: '#ccc',
    },
    weekdayText: {
        fontSize: 16,
    },
    weekdayTextSelected: {
        color: '#fff',
    },
});


interface Weekday {
    name: string;
    selected: boolean;
}

interface IAddChores {
    refetch: () => void;
}

const AddChores = ({ refetch }: IAddChores) => {
    const [title, setTitle] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState<string>('');

    const initialWeekdays: Weekday[] = [
        { name: 'S', selected: false },
        { name: 'M', selected: false },
        { name: 'T', selected: false },
        { name: 'W', selected: false },
        { name: 'Th', selected: false },
        { name: 'F', selected: false },
        { name: 'S', selected: false },
    ];
    const [weekdays, setWeekdays] = useState<Weekday[]>(initialWeekdays);
    const [points, setPoints] = useState<string>()
    const handleCreate = async () => {
        setLoading(true);
        try {

            const household = await AsyncStorage.getItem(
                'household'
            );
            const parsedDays: Array<number> = []
            weekdays.forEach((day, index) => {
                if (day.selected) {
                    parsedDays.push(index + 1);
                }
            })
            const res = await axios.post('https://c682-2620-101-f000-704-00-12.ngrok-free.app/api/chore', {
                name: title,
                description: description,
                householdId: household,
                points: Number.isInteger(points) ? points as unknown as number : 5,
                repetition: {
                    days: parsedDays
                }
            })
            if (res.data) {
                Alert.alert('successully added chore!');
                refetch();
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const toggleWeekday = (index: number) => {
        let newWeekdays = [...weekdays];
        newWeekdays[index].selected = !newWeekdays[index].selected;
        setWeekdays(newWeekdays);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create a New Chore</Text>

            {/* Input for Chore Title */}
            <Input
                placeholder='Chore Title'
                onChangeText={(text) => setTitle(text)}
                value={title}
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.roundedInput}
            />

            {/* Input for Chore Description */}
            <Input
                placeholder='Chore Description'
                onChangeText={(text) => setDescription(text)}
                value={description}
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.roundedInput}
            />
            {/* Input for Chore Description */}
            <Input
                placeholder='How many points this chore is worth'
                onChangeText={(text) => setPoints(text.replace(/[^0-9]/g, ''))}
                value={points}
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.roundedInput}
            />


            {/* Weekday Selector */}
            <View style={styles.weekdayContainer}>
                {weekdays.map((weekday, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.weekdayButton,
                            weekday.selected ? styles.weekdayButtonSelected : null,
                        ]}
                        onPress={() => toggleWeekday(index)}
                    >
                        <Text
                            style={[
                                styles.weekdayText,
                                weekday.selected ? styles.weekdayTextSelected : null,
                            ]}
                        >
                            {weekday.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {/* Create Chore Button */}
            <Button
                title="Create Chore"
                onPress={() => {
                    handleCreate();
                }}
            />
        </View>
    );
};

export default AddChores;
