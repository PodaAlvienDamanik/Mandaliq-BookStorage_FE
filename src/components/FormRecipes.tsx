import { Textarea } from "@headlessui/react";
import { UseMutateFunction } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormRecipesElementProps {
    isEdit: boolean;
    mutateFn: UseMutateFunction<any, Error, Recipe, unknown>;
    defaultInputData?: Recipe;
}

export type FormRecipesFields = {
    name: string;
    ingredients: string;
    instructions: string;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    tags: string;
    rating: number;
    mealType: string;
};

export type Recipe = {
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
    rating: number;
    mealType: string[];
};

const ArrStringToTextLine = (arrString : string[]) =>{
    let formattedString : string = "";
    for(let i = 0; i < arrString.length; i++){
        formattedString += arrString[i];
        if(i < arrString.length -1){
            formattedString += "\n";
        }
    }
    return formattedString;
}

const TextLineToArrString = (TextLine : string) => {
    const arrStrings : string[] = [];
    let temp : string = "";
    for(let i = 0; i < TextLine.length; i++){
        if(TextLine[i] === "\n" || i == TextLine.length -1){
            if(i == TextLine.length - 1) temp += TextLine[i];
            arrStrings.push(temp);
            temp = "";
        }else{
            temp += TextLine[i];
        }
    }
    return arrStrings;
}


const reformatTextFieldToObject = (formData : FormRecipesFields) => {
    const reformatedDat : Recipe = {
        name : formData.name,
        ingredients : TextLineToArrString(formData.ingredients),
        instructions: TextLineToArrString(formData.instructions),
        prepTimeMinutes: formData.prepTimeMinutes,
        cookTimeMinutes: formData.cookTimeMinutes,
        servings: formData.servings,
        difficulty: formData.difficulty,
        cuisine: formData.cuisine,
        caloriesPerServing: formData.caloriesPerServing,
        tags: TextLineToArrString(formData.tags),
        rating: formData.rating,
        mealType: TextLineToArrString(formData.mealType)

    };

    return reformatedDat;
}


const RecipeForm: React.FC<FormRecipesElementProps> = (props) => {
    const{register, handleSubmit, setValue, formState: {errors}} = useForm<FormRecipesFields>();
    useEffect(() =>{
        if(props.defaultInputData){
            setValue("name", props.defaultInputData.name);
            setValue("ingredients", ArrStringToTextLine(props.defaultInputData.ingredients));
            setValue("instructions", ArrStringToTextLine(props.defaultInputData.instructions));
            setValue("prepTimeMinutes", props.defaultInputData.prepTimeMinutes);
            setValue("cookTimeMinutes", props.defaultInputData.cookTimeMinutes);
            setValue("servings", props.defaultInputData.servings);
            setValue("difficulty", props.defaultInputData.difficulty);
            setValue("cuisine", props.defaultInputData.cuisine);
            setValue("caloriesPerServing", props.defaultInputData.caloriesPerServing);
            setValue("tags", ArrStringToTextLine(props.defaultInputData.tags));
            setValue("rating", props.defaultInputData.rating);
            setValue("mealType", ArrStringToTextLine(props.defaultInputData.mealType));
        }
    }, [props.defaultInputData])

    const onSubmit: SubmitHandler<FormRecipesFields> = (data) => {


        if (props.isEdit) {
            if (!confirm("Are you sure want to update recipe data ? ")) {
            return;
            }
        }

        const reformatedDat = reformatTextFieldToObject(data);
        console.log(reformatedDat);
        props.mutateFn(reformatedDat);
    };

    return(
        <>
            <form className="flex flex-col space-y-5 mx-auto max-w-[500px] bg-gray-800 p-5 rounded-2xl" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-bold text-white" htmlFor="name">Nama</label>
                    <input className="rounded-lg" type="text" id="name" {...register('name',{required: "Name is required."})} />
                    {
                        errors.name && (
                            <p className="text-red-500 italic">{errors.name.message }</p>   
                        ) 
                    }
                    <p className="italic bg-red-500">{}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-lg font-bold text-white" htmlFor="difficulty">Kesulitan</label>
                    <input className="rounded-lg" type="text" id="difficulty" {...register('difficulty',{required: "Difficulty is required."})} />
                    {
                        errors.difficulty && (
                            <p className="text-red-500 italic">{errors.difficulty.message }</p>   
                        ) 
                    }
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-lg font-bold text-white" htmlFor="prepTimeMinutes">Waktu Penyiapan</label>
                    <div className="flex">
                        <input className="rounded-l-lg w-full" type="number" id="prepTimeMinutes" {...register('prepTimeMinutes',{required: "Preparation time is required."})} />
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300">
                            Menit
                        </span>
                    </div>
                    {
                        errors.prepTimeMinutes && (
                            <p className="text-red-500 italic">{errors.prepTimeMinutes.message }</p>   
                        ) 
                    }
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-bold text-white" htmlFor="cookTimeMinutes">Waktu</label>
                    <div className="flex">
                        <input className="rounded-l-lg w-full" type="number" id="cookTimeMinutes" {...register('cookTimeMinutes',{required: "Cooking Time is required."})} />
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300">
                            Menit
                        </span>
                    </div>
                    {
                        errors.cookTimeMinutes && (
                            <p className="text-red-500 italic">{errors.cookTimeMinutes.message }</p>   
                        ) 
                    }
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex space-x-3">
                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-bold text-white" htmlFor="servings">Penyiapan</label>
                            <input className="rounded-lg w-full" type="number" id="servings" {...register('servings',{required: "Servings amount is required."})} />
                            {
                                errors.servings && (
                                    <p className="text-red-500 italic">{errors.servings.message }</p>   
                                ) 
                            }
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-bold text-white" htmlFor="cuisine">Masakan</label>
                            <input className="rounded-lg w-full" type="text" id="cuisine" {...register('cuisine',{required: "Cuisine is required."})} />
                            {
                                errors.cuisine && (
                                    <p className="text-red-500 italic">{errors.cuisine.message }</p>   
                                ) 
                            }
                        </div>

                    </div>
                    <div className="flex space-x-3">
                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-bold text-white" htmlFor="caloriesPerServing">Penyiapan</label>
                            <input className="rounded-lg w-full" type="number" id="caloriesPerServing" {...register('caloriesPerServing',{required: "Cal/serving amount is required."})} />
                            {
                                errors.caloriesPerServing && (
                                    <p className="text-red-500 italic">{errors.caloriesPerServing.message }</p>   
                                ) 
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-bold text-white" htmlFor="rating">Rating</label>
                            <input className="rounded-lg w-full" type="number" id="rating" step={0.1} {...register('rating',{required: "Rating is required."})} />
                            {
                                errors.rating && (
                                    <p className="text-red-500 italic">{errors.rating.message }</p>   
                                ) 
                            }
                        </div>
                    </div>
                </div>
                

                <div className="flex flex-col gap-2">
                    <label className="text-lg font-bold text-white" htmlFor="ingredients">Bahan-Bahan</label>
                    <Textarea className="rounded-lg h-[10rem]" id="ingredients" {...register('ingredients',{required: "Ingredients is required."})} ></Textarea>
                    {
                        errors.ingredients && (
                            <p className="text-red-500 italic">{errors.ingredients.message }</p>   
                        ) 
                    }
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-lg font-bold text-white" htmlFor="instructions">Instruksi</label>
                    <Textarea className="rounded-lg h-[20rem]" id="instructions" {...register('instructions',{required: "Instructions is required."})} ></Textarea>
                    {
                        errors.instructions && (
                            <p className="text-red-500 italic">{errors.instructions.message }</p>   
                        ) 
                    }
                </div>
                <div className="flex space-x-3">
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold text-white" htmlFor="mealType">Tipe Makanan</label>
                        <Textarea className="rounded-lg w-full" id="mealType" {...register('mealType',{required: "Meal type is required."})} ></Textarea>
                        {
                            errors.mealType && (
                                <p className="text-red-500 italic">{errors.mealType.message }</p>   
                            ) 
                        }
                    </div>

                    <div className="flex flex-col gap-2 pl-7">
                        <label className="text-lg font-bold text-white" htmlFor="tags">Label</label>
                        <Textarea className="rounded-lg w-full" id="tags" {...register('tags',{required: "Tags is required."})} ></Textarea>
                        {
                            errors.tags && (
                                <p className="text-red-500 italic">{errors.tags.message }</p>   
                            ) 
                        }
                    </div>
                </div>
                
                
                <div className="flex items-center justify-center">
                    {props.isEdit ? (
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Simpan Resep
                    </button>
                    ) : (
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
                    >
                        Tambahkan Resep
                    </button>
                    )}
                </div>
            </form>
        </>
    );


};

export default RecipeForm;