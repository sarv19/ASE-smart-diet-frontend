import React from 'react';
import { Page, Text, View, Document } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';

export const downloadPdf = async (summaryData: any, allIngredients: any, date: string, t: any) => {
    const { breakfast, lunch, dinner, userTarget } = summaryData;
    
    const getIngredientNameById = (id: number) => {
        const idx = allIngredients?.find((ingredient: any) => ingredient?.ingredientId === id);
        return idx?.ingredientName;
    }

    const SummaryReport = (
        <Document>
            <Page size="A4" style={{ fontSize: 16, padding: 30, fontFamily: 'Courier' }}>
                <View style={{ paddingBottom: 20 }}>
                    <Text>{t("Target calories")}: {userTarget?.targetCaloriesMax} calories</Text>
                </View>
                { !breakfast && !lunch && !dinner && <Text>{t("No data yet")}</Text>}
                {breakfast &&
                    <View style={{paddingBottom: 15}}>
                        <Text style={{paddingBottom: 10}}>{t("Breakfast")}:</Text>
                        <Text style={{paddingLeft: 15, paddingBottom: 10, fontSize: 13}}>{t("Total calories")}: {breakfast?.meal?.totalCalories}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {t("Weight")}: {breakfast?.meal?.totalWeight} gr</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {t("Protein")}: {breakfast?.meal?.totalProtein} gr</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {t("Fat")}: {breakfast?.meal?.totalFat} mg</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {t("Carbohydrate")}: {breakfast?.meal?.totalCarbohydrate} mg</Text>
                        <Text style={{paddingLeft: 15, paddingBottom: 10, fontSize: 14}}>{t("Ingredients")}:</Text>
                        {breakfast?.ingredients?.map((item: any, index: number) =>
                            <Text key={index} style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {t(getIngredientNameById(item?.ingredientId))}: {item?.weight} gr</Text>)
                        }
                    </View>
                }
                {lunch &&
                    <View>
                        <Text style={{paddingBottom: 10}}>Lunch:</Text>
                        <Text style={{paddingLeft: 15, paddingBottom: 10, fontSize: 13}}>{t("Total calories")}: {lunch?.meal?.totalCalories}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {t("Weight")}: {lunch?.meal?.totalWeight}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {t("Protein")}: {lunch?.meal?.totalProtein}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {t("Fat")}: {lunch?.meal?.totalFat}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {t("Carbohydrate")}: {lunch?.meal?.totalCarbohydrate}</Text>
                        <Text style={{paddingLeft: 15, paddingBottom: 10, fontSize: 14}}>{t("Ingredients")}:</Text>
                        {lunch?.ingredients?.map((item: any, index: number) =>
                            <Text key={index} style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {t(getIngredientNameById(item?.ingredientId))}: {item?.weight} gr</Text>)
                        }
                    </View>
                }
                {dinner &&
                    <View>
                        <Text style={{paddingBottom: 10}}>Dinner:</Text>
                        <Text style={{paddingLeft: 15, paddingBottom: 10, fontSize: 13}}>{t("Total calories")}: {dinner?.meal?.totalCalories}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {t("Weight")}: {dinner?.meal?.totalWeight}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {t("Protein")}: {dinner?.meal?.totalProtein}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {t("Fat")}: {dinner?.meal?.totalFat}</Text>
                        <Text style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {t("Carbohydrate")}: {dinner?.meal?.totalCarbohydrate}</Text>
                        <Text style={{paddingLeft: 15, paddingBottom: 10, fontSize: 14}}>{t("Ingredients")}:</Text>
                        {dinner?.ingredients?.map((item: any, index: number) =>
                            <Text key={index} style={{paddingLeft: 30, paddingBottom: 10, fontSize: 13}}>+ {t(getIngredientNameById(item?.ingredientId))}: {item?.weight} gr</Text>)
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
    a.download = `Summary-Report-${date}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
};