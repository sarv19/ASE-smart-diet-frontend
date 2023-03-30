import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';

export const downloadPdf = async (summaryData: any, allIngredients: any) => {
    const { breakfast, lunch, dinner, userTarget } = summaryData;

    console.log(breakfast)
    
    const getIngredientNameById = (id: number) => {
        console.log('all: ', allIngredients)
        const idx = allIngredients?.find((ingredient: any) => ingredient?.id === id);
        console.log("found? ", idx)
        return idx?.label;
    }

    const SummaryReport = (
        <Document>
            <Page size="A4" style={{ fontSize: 16, padding: 30 }}>
                <View style={{ paddingBottom: 20 }}>
                    <Text>Daily Target: {userTarget?.targetCaloriesMax} calories</Text>
                </View>
                {breakfast &&
                    <View style={{paddingBottom: 15}}>
                        <Text style={{paddingBottom: 10}}>Breakfast:</Text>
                        <Text style={{paddingLeft: 15, paddingBottom: 10, fontSize: 13}}>Total calories: {breakfast?.meal?.totalCalories}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ Weight: {breakfast?.meal?.totalWeight}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ Protein: {breakfast?.meal?.totalProtein}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ Fat: {breakfast?.meal?.totalFat}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ Carbohydrate: {breakfast?.meal?.totalCarbohydrate}</Text>
                        <Text style={{paddingLeft: 15, paddingBottom: 10, fontSize: 14}}>Ingredients:</Text>
                        {breakfast?.ingredients?.map((item: any) =>
                            <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {getIngredientNameById(item?.ingredientId)}: {item?.weight} gr</Text>)
                        }
                    </View>
                }
                {lunch &&
                    <View>
                        <Text style={{paddingBottom: 10}}>Lunch:</Text>
                        <Text style={{paddingLeft: 15, paddingBottom: 10, fontSize: 13}}>Total calories: {lunch?.meal?.totalCalories}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ Weight: {lunch?.meal?.totalWeight}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ Protein: {lunch?.meal?.totalProtein}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ Fat: {lunch?.meal?.totalFat}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ Carbohydrate: {lunch?.meal?.totalCarbohydrate}</Text>
                        <Text style={{paddingLeft: 15, paddingBottom: 10, fontSize: 14}}>Ingredients:</Text>
                        {lunch?.ingredients?.map((item: any) =>
                            <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {getIngredientNameById(item?.ingredientId)}: {item?.weight} gr</Text>)
                        }
                    </View>
                }
                {dinner &&
                    <View>
                        <Text style={{paddingBottom: 10}}>Dinner:</Text>
                        <Text style={{paddingLeft: 15, paddingBottom: 10, fontSize: 13}}>Total calories: {dinner?.meal?.totalCalories}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ Weight: {dinner?.meal?.totalWeight}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ Protein: {dinner?.meal?.totalProtein}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ Fat: {dinner?.meal?.totalFat}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ Carbohydrate: {dinner?.meal?.totalCarbohydrate}</Text>
                        <Text style={{paddingLeft: 15, paddingBottom: 10, fontSize: 14}}>Ingredients:</Text>
                        {dinner?.ingredients?.map((item: any) =>
                            <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {getIngredientNameById(item?.ingredientId)}: {item?.weight} gr</Text>)
                        }
                    </View>
                }
            </Page>
        </Document>
    );

    const blob = await pdf(SummaryReport).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary-report.pdf';
    a.click();
    URL.revokeObjectURL(url);
};